const User = require('../models/User');
const Notification = require('../models/Notification');

console.log('User model:', User);

// Create user
exports.createUser = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = new User({ name });
    await user.save();

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user notifications
exports.getNotifications = async (req, res) => {
    const { id } = req.params;
  
    try {
      const notifications = await Notification.find({ user: id }).sort({ createdAt: -1 });
  
      res.json({ notifications });
    } catch (err) {
      console.error('Error fetching notifications:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
