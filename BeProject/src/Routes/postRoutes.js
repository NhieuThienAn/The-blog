import express from 'express';
import * as postController from '../Controllers/PostController.js';
import authentication from '../Middleware/authentication.js';
import upload from '../Middleware/upload.js'; 

const router = express.Router();

// Get posts by search query
router.get('/posts/search', postController.getPostsBySearch);

// Create a new post
router.post('/posts', authentication, upload.single('image'), postController.createPost); 

// Get all posts
router.get('/posts', postController.getAllPosts);

//get all posts for admin
router.get('/admin/posts', authentication, postController.getAllPostsForAdmin);

// Get a post by ID
router.get('/posts/:post_id', postController.getPostById);

// Get posts by category ID
router.get('/posts/category/:category_id', postController.getPostsByCategory); 

// Get posts by user ID
router.get('/posts/user/:user_id', postController.getPostsByUserId);

// Change a post by ID
router.put('/posts/:postId', authentication , upload.single('image'), postController.updatePost);

// Change a post by ID for admin
router.put('/posts/admin/:postId', authentication , postController.updatePostForAdmin);

// Delete a post by ID
router.delete('/posts/:postId', authentication, postController.deletePost);

// Like a post
router.post('/posts/:id/like', authentication, postController.likePost);

// Unlike a post
router.post('/posts/:id/unlike', authentication, postController.unlikePost);


// check if a post has been liked by  user ID
router.get('/posts/:post_id/has-liked', authentication ,postController.hasUserLikedPost);

// statistics for a post
router.get('/admin/post-statistics',authentication, postController.getStatistics);

export default router;