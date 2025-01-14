import express from 'express';
import * as tagController from '../Controllers/TagControllers.js';
import authentication from '../Middleware/authentication.js';

const router = express.Router();

// Create a new tag 
router.post('/tags', authentication, tagController.createTag); // Tạo mới tag

// Get all tags
router.get('/tags', tagController.getAllTags); // Lấy tất cả tag

// Update a tag by ID
router.put('/tags/:tagId', authentication, tagController.updateTag); // Cập nhật tag

// Delete a tag by ID
router.delete('/tags/:tagId', authentication, tagController.deleteTag); // Xóa tag

export default router;