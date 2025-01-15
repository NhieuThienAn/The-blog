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
                path: 'user_id',
                select: 'username'
            });

        if (!comments.length) {
            return res.status(HttpStatusCode.OK).json(""); 
        }

        res.status(HttpStatusCode.OK).json(comments); 
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
export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    console.log('Params:', req.params);
    const user_id = req.user.id;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Comment not found.' });
        }
        
        if (req.user.role !== 'admin' && comment.user_id.toString() !== user_id) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(HttpStatusCode.OK).send();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};