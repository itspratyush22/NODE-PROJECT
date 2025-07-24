const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likesCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
