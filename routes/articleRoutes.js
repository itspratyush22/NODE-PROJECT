// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const {
  createArticle,
  likeArticle,
  viewArticle,
  getPopularArticles,
  getMostLikedArticles, // ✅
} = require('../controllers/articleController');

router.post('/create', createArticle);
router.post('/like', likeArticle);
router.post('/view', viewArticle);
router.get('/popular', getPopularArticles);
router.get('/most-liked', getMostLikedArticles);
router.get('/test', (req, res) => {
    res.send('Test route works');
  });
   // ✅

module.exports = router;
