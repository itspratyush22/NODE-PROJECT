const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); // ✅ no route logic here
