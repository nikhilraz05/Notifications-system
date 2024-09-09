import express from 'express';
import { processMessage } from '../controllers/messageController.js';

const router = express.Router();

router.post('/process-message', processMessage);

export default router;
