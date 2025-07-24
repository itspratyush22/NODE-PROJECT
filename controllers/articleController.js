const Article = require('../models/Article');
const Like = require('../models/Like');
const View = require('../models/View');
const Notification = require('../models/Notification');
const redisClient = require('../services/redisClient');

// Create an article
exports.createArticle = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const article = await Article.create({ title, content, author });
    res.status(201).json({ message: 'Article created', article });
  } catch (err) {
    console.error('Error creating article:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Like an article
exports.likeArticle = async (req, res) => {
  const { userId, articleId } = req.body;

  try {
    const existingLike = await Like.findOne({ user: userId, article: articleId });
    if (existingLike) {
      return res.status(400).json({ error: 'Already liked' });
    }

    await Like.create({ user: userId, article: articleId });

    const article = await Article.findByIdAndUpdate(
      articleId,
      { $inc: { likesCount: 1 } },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Increment in Redis Hash
    await redisClient.hIncrBy('popular_articles_likes', articleId.toString(), 1);
    // Increment in Redis Sorted Set
    await redisClient.zIncrBy('most_liked_articles', 1, articleId.toString());

    // Notification if not liked by self
    if (article.author.toString() !== userId) {
      await Notification.create({
        user: article.author,
        message: `Your article "${article.title}" was liked by user ${userId}`,
      });
    }

    res.json({ message: 'Article liked', article });

  } catch (err) {
    console.error('Error liking article:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// View an article
exports.viewArticle = async (req, res) => {
  try {
    const { userId, articleId } = req.body;

    const article = await Article.findById(articleId);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    await View.create({ user: userId, article: articleId });

    article.viewsCount++;
    await article.save();

    // Update Redis
    await redisClient.hIncrBy('popular_articles_views', articleId.toString(), 1);
    await redisClient.zIncrBy('popular_articles', 1, articleId.toString());

    res.json({ message: 'Article viewed', viewsCount: article.viewsCount, article });
  } catch (err) {
    console.error('Error viewing article:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get most popular articles (likes + views)
exports.getPopularArticles = async (req, res) => {
  try {
    const likes = await redisClient.hGetAll('popular_articles_likes');
    const views = await redisClient.hGetAll('popular_articles_views');

    const scores = {};
    for (const articleId in likes) {
      scores[articleId] = (scores[articleId] || 0) + parseInt(likes[articleId], 10);
    }
    for (const articleId in views) {
      scores[articleId] = (scores[articleId] || 0) + parseInt(views[articleId], 10);
    }

    const sorted = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const articleIds = sorted.map(([id]) => id);
    const articles = await Article.find({ _id: { $in: articleIds } });

    res.json({ popular: articles });
  } catch (err) {
    console.error('Error getting popular articles:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMostLikedArticles = async (req, res) => {
    try {
      const likes = await redisClient.hGetAll('popular_articles_likes');
  
      const sorted = Object.entries(likes)
        .sort((a, b) => parseInt(b[1]) - parseInt(a[1]))
        .slice(0, 5);
  
      const articleIds = sorted.map(([id]) => id);
      const articles = await Article.find({ _id: { $in: articleIds } });
  
      res.json({ mostLiked: articles });
    } catch (err) {
      console.error('Error getting most liked articles:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  