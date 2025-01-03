import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now }
});
tagSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});
const Tag = mongoose.model('Tag', tagSchema);
export default Tag;