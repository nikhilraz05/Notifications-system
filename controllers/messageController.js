import Message from '../models/messageModel.js';

// Consume messages from the message queue (RabbitMQ or Kafka)
export const processMessage = async (req, res) => {
  const { userId, notificationId, message } = req.body;
  try {
    const msg = new Message({ userId, notificationId, message });
    await msg.save();
    res.status(201).json({ message: 'Message processed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
