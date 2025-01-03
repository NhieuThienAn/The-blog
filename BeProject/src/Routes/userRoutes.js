// src/routes/userRoutes.js

import express from 'express';
import * as userController from '../Controllers/UserController.js';
import authentication from '../Middleware/authentication.js';
import upload from '../Middleware/upload.js'; // Thêm dòng này

const router = express.Router();

// Register
router.post('/register', upload.single('avatar'), userController.register);

// Login
router.post('/login', userController.login);

// Get all users
router.get('/users', userController.getAllUsers);

// Get user by ID
router.get('/users/:id', userController.getUsersById);

// Update user information
router.put('/users/:id', authentication, userController.updateUser);

// Delete user
router.delete('/users/:id', authentication, userController.deleteUser);

// Request password reset
router.post('/forgot-password', userController.requestPasswordReset);

// Reset password
router.post('/reset', userController.resetPassword);

// Lock user
router.patch('/users/:id/lock', authentication, userController.lockUser); // Route để khóa người dùng

// Unlock user
router.patch('/users/:id/unlock', authentication, userController.unlockUser); // Route để mở khóa người dùng

// Get top users by likes
router.get('/users/top-likes', userController.getTopUsersByLikes);

export default router;