const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json()); // ✅ Important for JSON parsing

// Routes
app.use('/api/articles', articleRoutes);
;  // already working
app.use('/api/users', userRoutes);        // ✅ ADD THIS if missing

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

