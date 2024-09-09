import express from 'express';
import { createNotification, getNotifications, markAsRead } from '../controllers/notificationController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/notifications', authenticateJWT, createNotification);
router.get('/notifications', authenticateJWT, getNotifications);
router.put('/notifications/:id', authenticateJWT, markAsRead);

export default router;
