import express from 'express';
import * as categoryController from '../Controllers/CategoryController.js';
import authentication from '../Middleware/authentication.js';

const router = express.Router();

// Create a new category
router.post('/categories', authentication, categoryController.createCategory); 

// Get all categories
router.get('/categories', categoryController.getAllCategories); 

// Update a category by ID
router.put('/categories/:id', authentication, categoryController.updateCategory); 

// Delete a category by ID
router.delete('/categories/:id', authentication, categoryController.deleteCategory); 

export default router;