import Tag from '../Models/Tag.js';
import { HttpStatusCode } from '../constants/HttpStatusCode.js';

// Create a new tag
export const createTag = async (req, res) => {
    const { name } = req.body;
    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }
    try {
        const tag = new Tag({ name });
        await tag.save();
        res.status(HttpStatusCode.OK).json(tag);
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Get all tags
export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(HttpStatusCode.OK).json(tags);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Update a tag
export const updateTag = async (req, res) => {
    const { tagId } = req.params;
    const { name } = req.body;
    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }
    try {
        await Tag.findByIdAndUpdate(tagId, { name });
        const updatedTag = await Tag.findById(tagId);
        if (!updatedTag) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Tag not found.' });
        }
        res.json(updatedTag);
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Delete a tag
export const deleteTag = async (req, res) => {
    const { tagId } = req.params;
    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }
    try {
        const deletedTag = await Tag.findByIdAndDelete(tagId);
        if (!deletedTag) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Tag not found.' });
        }
        res.status(HttpStatusCode.OK).send();
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};