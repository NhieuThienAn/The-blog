import express from 'express';
import * as categoryController from '../Controllers/CategoryController.js';
import authentication from '../Middleware/authentication.js';

const router = express.Router();

// Create a new category
router.post('/categories', authentication, categoryController.createCategory); // Tạo mới danh mục

// Get all categories
router.get('/categories', categoryController.getAllCategories); // Lấy tất cả danh mục

// Update a category by ID
router.put('/categories/:id', authentication, categoryController.updateCategory); // Cập nhật danh mục

// Delete a category by ID
router.delete('/categories/:id', authentication, categoryController.deleteCategory); // Xóa danh mục

export default router;