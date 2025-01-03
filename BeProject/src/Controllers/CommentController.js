import Comment from '../Models/Comment.js';
import { HttpStatusCode } from '../constants/HttpStatusCode.js';

// Create a new comment
export const createComment = async (req, res) => {
    const { post_id, content } = req.body;
    const user_id = req.user.id; 
    try {
        const comment = new Comment({ post_id, user_id, content });
        await comment.save();
        res.status(HttpStatusCode.OK).json(comment); 
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Get all comments
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.json(comments);
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Get comments by Post ID 
export const getCommentsByPostId = async (req, res) => {
    const { post_id } = req.params; 
    try {
        const comments = await Comment.find({ post_id })
        .populate({
            path: 'user_id', // Lấy thông tin người dùng
            select: 'username' // Chỉ lấy trường username
        });
        // Trả về chuỗi rỗng nếu không có bình luận
        if (!comments.length) {
            return res.status(HttpStatusCode.OK).json(""); // Trả về chuỗi rỗng
        }

        res.status(HttpStatusCode.OK).json(comments); // Trả về bình luận nếu có
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
}

// Update comment by ID
export const updateCommentById = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const user_id = req.user.id;

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Comment not found.' });
        }

        // Kiểm tra quyền truy cập
        if (req.user.role !== 'admin' && user_id !== comment.user_id.toString()) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
        }

        comment.content = content;
        await comment.save();

        res.status(HttpStatusCode.OK).json(comment);
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Delete comments by Post ID
export const deleteCommentsByPostId = async (req, res) => {
    const { post_id } = req.params; // Lấy post_id từ tham số route
    const user_id = req.user.id; // Lấy user_id từ middleware xác thực

    try {
        const comments = await Comment.find({ post_id });

        // Kiểm tra xem có bình luận nào không
        if (!comments.length) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'No comments found for this post.' });
        }

        // Kiểm tra quyền truy cập
        if (req.user.role !== 'admin' && !comments.every(comment => comment.user_id.toString() === user_id)) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
        }

        // Xóa tất cả bình luận
        await Comment.deleteMany({ post_id });
        res.status(HttpStatusCode.OK).send();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};