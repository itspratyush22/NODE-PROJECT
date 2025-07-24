const Notification = require('../models/Notification');

async function sendNotification(userId, message) {
  const notification = new Notification({ user: userId, message });
  await notification.save();
  console.log(`Notification sent to user ${userId}: ${message}`);
}

module.exports = sendNotification;
