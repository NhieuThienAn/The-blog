import dotenv from 'dotenv';
dotenv.config();

import User from '../Models/User.js';
import Post from '../Models/Post.js'; // Đảm bảo rằng bạn đã import model Post

import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../constants/HttpStatusCode.js';
import htmlDocx from 'html-docx-js';
import { Buffer } from 'buffer';

const SECRET_KEY = process.env.SECRET_KEY;

// Register
export const register = async (req, res) => {
    console.log(req.body); // Log req.body để kiểm tra nội dung
    const { username, email, password } = req.body; // Lấy thông tin từ req.body
    const avatar_url = req.file ? req.file.path : null; // Lấy đường dẫn hình ảnh từ multer

    if (!email || !email.endsWith('@gmail.com')) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Email must end with @gmail.com.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password_hash: hashedPassword,
            avatar_url // Thêm avatar_url vào đối tượng người dùng
        });
        await user.save();
        res.status(HttpStatusCode.OK).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate email format
    if (!email.endsWith('@gmail.com')) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Email must end with @gmail.com.' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid credentials.' });
        }

        // Check if the user is locked
        if (user.locked) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'This user is locked and cannot log in.' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role, username: user.username },
            SECRET_KEY,
            { expiresIn: '30m' }
        );

        // Respond with user data
        return res.json({
            token,
            username: user.username,
            email: user.email,
            user_id: user.id,
            role: user.role,
            avatar_url: user.avatar_url
        });
    } catch (error) {
        // Handle unexpected errors
        return res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message || 'An unexpected error occurred.' });
    }
};

// Refresh Token
export const refreshToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'No token provided.' });
    }

    try {
        // Verify the existing token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Generate a new token
        const newToken = jwt.sign(
            { id: decoded.id, role: decoded.role, username: decoded.username },
            SECRET_KEY,
            { expiresIn: '30m' } // 30 minutes
        );

        return res.json({ token: newToken });
    } catch (error) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Invalid or expired token.' });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Get user by id
export const getUsersById = async (req, res) => {
    const { id } = req.params; // Lấy id từ params
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Update user information
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, bio } = req.body;
    const avatar_url = req.file ? req.file.path : null; // Lấy đường dẫn hình ảnh từ multer

    if (req.user.role !== 'admin' && req.user.id !== id) {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }

    try {
        const updatedData = { username, email, bio };
        if (avatar_url) {
            updatedData.avatar_url = avatar_url; // Cập nhật avatar_url nếu có file mới
        }

        if (password) {
            updatedData.password_hash = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found.' });
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (req.user.role !== 'admin' && req.user.id !== id) {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found.' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Function to send email
export const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or any other email service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
    };

    await transporter.sendMail(mailOptions);
};

// Request password reset
export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'User not found.' });
        }

        // Tạo mã xác nhận 6 số
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        user.verificationCode = verificationCode;
        user.verificationCodeExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        // Gửi mã xác nhận qua email
        await sendEmail(email, 'Password Reset Code', `Your verification code is: ${verificationCode}`);

        res.status(HttpStatusCode.OK).json({ message: 'Verification code sent to your email.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(HttpStatusCode.SERVER_ERROR).json({ message: 'An error occurred while sending the verification code. Please try again later.' });
    }
};

// Cập nhật hàm đặt lại mật khẩu
export const resetPassword = async (req, res) => {
    const { verificationCode, newPassword } = req.body;
    console.log('Reset Password', newPassword);
    console.log('Verificationcode', verificationCode);

    if (!verificationCode || !newPassword) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Both verification code and new password are required.' });
    }

    try {
        const user = await User.findOne({
            verificationCode,
            verificationCodeExpires: { $gt: Date.now() }
        });

        if (!user) {
            console.log('Invalid verification code or expired:', verificationCode);
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Verification code is invalid or has expired.' });
        }

        user.password_hash = await bcrypt.hash(newPassword, 10);
        user.verificationCode = undefined; // Xóa mã xác nhận
        user.verificationCodeExpires = undefined; // Xóa thời gian hết hạn

        await user.save();
        res.status(HttpStatusCode.OK).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Lock user
export const lockUser = async (req, res) => {
    const { id } = req.params;

    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }

    try {
        const user = await User.findByIdAndUpdate(id, { locked: true }, { new: true });
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found.' });
        }

        res.json({ message: 'User has been locked successfully.', user });
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Unlock user
export const unlockUser = async (req, res) => {
    const { id } = req.params;

    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }

    try {
        const user = await User.findByIdAndUpdate(id, { locked: false }, { new: true });
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found.' });
        }

        res.json({ message: 'User has been unlocked successfully.', user });
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};


// Hàm gửi email thông báo bài viết mới
export const sendNewPostNotification = async (post) => {
    const users = await User.find({ subscribed: true }); // Lấy danh sách người dùng đã đăng ký nhận thông báo

    for (const user of users) {
        const subject = `Có bài viết mới: ${post.title}`;
        const text = `Chào bạn, có bài viết mới trên trang của chúng tôi:\n\n Tiêu đề: ${post.title}\n\nXem thêm tại: http://localhost:3000/posts/${post._id}`;
        await sendEmail(user.email, subject, text); // Gửi email cho từng người dùng
    }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (req, res) => {
    const { email } = req.body;

    // Kiểm tra tính hợp lệ của email
    if (!email || !email.endsWith('@gmail.com')) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Email must end with @gmail.com.' });
    }

    try {
        // Kiểm tra xem email đã tồn tại trong database chưa
        let user = await User.findOne({ email });
        
        // Nếu chưa tồn tại, tạo mới một người dùng với trạng thái subscribed
        if (!user) {
            user = new User({ email, subscribed: true }); // Chỉ cần email và subscribed
            await user.save();
        } else {
            // Nếu đã tồn tại, chỉ cần cập nhật trạng thái subscribed
            user.subscribed = true;
            await user.save();
        }

        res.status(HttpStatusCode.OK).json({ message: 'Successfully subscribed to the newsletter.' });
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};



export const getUserStatistics = async (req, res) => {
    try {
        // Tổng số người dùng
        const totalUsers = await User.countDocuments();

        // Tổng số bài viết
        const totalPosts = await Post.countDocuments();

        // Số lượng người dùng theo trạng thái đăng ký nhận thông báo
        const subscribedUsersCount = await User.countDocuments({ subscribed: true });

        // Top 5 người dùng có nhiều bài viết nhất
        const topUsersByPosts = await Post.aggregate([
            { $group: { _id: '$user_id', postCount: { $sum: 1 } } },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'userInfo' } },
            { $unwind: { path: '$userInfo', preserveNullAndEmptyArrays: true } },
            { $project: { username: '$userInfo.username', postCount: '$postCount' } },
            { $sort: { postCount: -1 } },
            { $limit: 5 }
        ]);

        // Gộp thông tin thống kê
        const statistics = {
            totalUsers,
            totalPosts,
            subscribedUsersCount,
            topUsersByPosts
        };

        res.status(HttpStatusCode.OK).json(statistics);
    } catch (error) {
        console.error('Error fetching user statistics:', error);
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};


// Get top users by posts
export const getTopUsersByPosts = async (req, res) => {
    try {
        console.log("Fetching top users by posts...");

        const topUsers = await Post.aggregate([
            { $group: { _id: '$user_id', postCount: { $sum: 1 } } },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'userInfo' } },
            { $unwind: { path: '$userInfo', preserveNullAndEmptyArrays: true } },
            { $project: { 
                _id: 0, 
                user_id: '$_id', 
                username: '$userInfo.username', 
                email: '$userInfo.email', 
                avatar_url: '$userInfo.avatar_url', 
                postCount: '$postCount' 
            }},
            { $sort: { postCount: -1 } },
            { $limit: 3 } // Adjust limit as needed
        ]);

        console.log("Top users fetched:", topUsers);
        res.json(topUsers);
    } catch (error) {
        console.error('Error fetching top users:', error);
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};



// Hàm để kiểm tra và gửi thông báo về bài viết mới
const checkAndNotifyNewPosts = async () => {
    const newPosts = await Post.find({ createdAt: { $gte: new Date(Date.now() - 600000) } }); // Lấy bài viết mới trong 1 phút qua

    for (const post of newPosts) {
        await sendNewPostNotification(post);
    }
};

// Thiết lập interval để gửi thông báo mỗi phút
setInterval(checkAndNotifyNewPosts, 60000);