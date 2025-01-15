import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image_url: { type: String, required: false }, 
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likes: { type: Number, default: 0 }, 
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

postSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Post = mongoose.model('Post', postSchema);
export default Post; 