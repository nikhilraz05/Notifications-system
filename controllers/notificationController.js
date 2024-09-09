import Notification from '../models/notificationModel.js';

// Create a new notification
export const createNotification = async (req, res) => {
  const { message, userId } = req.body;
  try {
    const notification = new Notification({ userId, message });
    await notification.save();
    res.status(201).json({ notification });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all notifications for the authenticated user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.userId });
    res.json({ notifications });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    res.json({ notification });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
