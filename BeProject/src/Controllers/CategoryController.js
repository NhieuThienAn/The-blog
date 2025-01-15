import { HttpStatusCode } from '../constants/HttpStatusCode.js';
import Category from '../Models/Category.js';

// Create a new category
export const createCategory = async (req, res) => {
    const { name } = req.body;
    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }
    try {
        const category = new Category({ name });
        await category.save();
        res.status(HttpStatusCode.OK).json(category); 
    } catch (error) {
        console.log(error);
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

// Update a category
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'No category found.' });
        }

        category.name = name || category.name;

        await category.save();
        res.status(HttpStatusCode.OK).json(category);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'No category found.' });
        }
        await Category.findByIdAndDelete(id);
        res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};