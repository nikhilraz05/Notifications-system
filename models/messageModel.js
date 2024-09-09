import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Notification', required: true },
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Message', MessageSchema);
