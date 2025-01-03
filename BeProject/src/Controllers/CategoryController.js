import { HttpStatusCode } from '../constants/HttpStatusCode.js';
import Category from '../Models/Category.js';

// Create a new category
export const createCategory = async (req, res) => {
    const { name, description } = req.body;
    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }
    try {
        const category = new Category({ name, description });
        await category.save();
        res.status(HttpStatusCode.OK).json(category);
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

export const DeleteCategory = async (req, res) => {
    const { id } = req.params;
    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }
    try {
        const categories = await Category.findById(id);
        if (!categories) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'No categories found.' });
        }
        await Category.findByIdAndDelete(id);
        res.status(HttpStatusCode.OK).send(); 
    }
    catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};