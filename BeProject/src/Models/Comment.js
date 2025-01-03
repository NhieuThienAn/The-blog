import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

commentSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;