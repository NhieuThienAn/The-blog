import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }, 
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now }
});

categorySchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;