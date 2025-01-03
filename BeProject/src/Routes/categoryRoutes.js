import express from 'express';
import * as categoryController from '../Controllers/CategoryController.js';
import authentication from '../Middleware/authentication.js';

const router = express.Router();

// Create a new category
router.post('/categories',authentication, categoryController.createCategory); // OK

// Get all categories
router.get('/categories', categoryController.getAllCategories); // OK

// Delete a categories
router.delete('/categories/:id', authentication, categoryController.DeleteCategory); // OK

export default router;