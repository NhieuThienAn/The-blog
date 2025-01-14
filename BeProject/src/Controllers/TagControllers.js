import Tag from '../Models/Tag.js';
import { HttpStatusCode } from '../constants/HttpStatusCode.js';

// Create a new tag
export const createTag = async (req, res) => {
    const { name } = req.body;
    // Kiểm tra quyền truy cập
    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }
    
    // Kiểm tra xem tên tag có hợp lệ hay không
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid tag name.' });
    }
    
    try {
        const tag = new Tag({ name });
        await tag.save();
        res.status(HttpStatusCode.OK).json(tag); // Trả về tag đã tạo với status 201 Created
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Get all tags
export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(HttpStatusCode.OK).json(tags); // Trả về danh sách tag với status 200 OK
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Update a tag
export const updateTag = async (req, res) => {
    const { tagId } = req.params;
    const { name } = req.body;

    // Kiểm tra quyền truy cập
    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }

    // Kiểm tra xem tên tag có hợp lệ hay không
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid tag name.' });
    }

    try {
        const updatedTag = await Tag.findByIdAndUpdate(tagId, { name }, { new: true, runValidators: true });
        if (!updatedTag) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Tag not found.' });
        }
        res.status(HttpStatusCode.OK).json(updatedTag); // Trả về tag đã cập nhật với status 200 OK
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Delete a tag
export const deleteTag = async (req, res) => {
    const { tagId } = req.params;

    // Kiểm tra quyền truy cập
    if (req.user.role !== 'admin') {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }

    try {
        const deletedTag = await Tag.findByIdAndDelete(tagId);
        if (!deletedTag) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Tag not found.' });
        }
        res.status(HttpStatusCode.NO_CONTENT).send(); // Sử dụng status 204 No Content
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};