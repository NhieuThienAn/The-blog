import express from 'express';
import * as commentController from '../Controllers/CommentController.js';
import authentication from '../Middleware/authentication.js';

const router = express.Router();

// Create a new comment
router.post('/comments', authentication, commentController.createComment);

// Get all comments
router.get('/comments', commentController.getAllComments);

// Get comments by post ID
router.get('/posts/:post_id/comments', commentController.getCommentsByPostId);

// Delete comments by Post ID
router.delete('/posts/:post_id/comments', authentication, commentController.deleteCommentsByPostId);

// Update a comment
router.put('/comments/:id', authentication, commentController.updateCommentById);

export default router;