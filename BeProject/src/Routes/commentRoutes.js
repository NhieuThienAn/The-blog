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

router.delete('/comments/:commentId', authentication, commentController.deleteComment);
// Update a comment
router.put('/comments/:id', authentication, commentController.updateCommentById);

export default router;