import express from 'express';
import * as tagController from '../Controllers/TagControllers.js';
import authentication from '../Middleware/authentication.js';

const router = express.Router();

// Create a new tag 
router.post('/tags', authentication, tagController.createTag);

// Get all tag
router.get('/tags', tagController.getAllTags);

// Change a tag by ID
router.put('/tags/:tagId', authentication, tagController.updateTag);

// Delete a tag by ID
router.delete('/tags/:tagId', authentication, tagController.deleteTag);

export default router;