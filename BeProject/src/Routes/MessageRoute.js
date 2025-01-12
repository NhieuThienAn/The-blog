import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

// Gửi tin nhắn
router.post('/messages', sendMessage);

// Lấy tin nhắn giữa 2 người dùng
router.get('/messages/:user1/:user2', getMessages);

export default router;