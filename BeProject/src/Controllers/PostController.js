import Post from '../Models/Post.js';
import { HttpStatusCode } from '../constants/HttpStatusCode.js';
import Tag from '../Models/Tag.js';
import mongoose from 'mongoose'; // Ensure you import mongoose at the top of your file
import { sendNewPostNotification } from './UserController.js';
// Create a new post
export const createPost = async (req, res) => {
    const { category_id, title, content, slug, status, tags = [], user_id } = req.body;

    console.log("Request Body:", req.body); // Log the request body

    // Title validation
    if (title.length > 100) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Title must not exceed 40 characters.' });
    }

    const image_url = req.file ? req.file.path : null; // Get image path from multer
    if (!Array.isArray(tags)) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Tags must be an array.' });
    }

    try {
        const tagIds = await Promise.all(
            tags.map(async (tagName) => {
                const tag = await Tag.findOne({ name: tagName });
                return tag ? tag._id : null;
            })
        );
        const validTagIds = tagIds.filter(id => id !== null);
        
        const post = new Post({ user_id, category_id, title, content, slug, image_url, status, tags: validTagIds });
        await post.save();
        //await sendNewPostNotification(post); // Gọi hàm gửi email thông báo
        res.status(HttpStatusCode.OK).json(post);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message || "Không thể tạo bài viết. Vui lòng thử lại sau." });
    }
};


// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({ status: 'published' }) // Lấy các bài viết có trạng thái published
            .limit(20); // Giới hạn số lượng bài viết trả về

        // Chuyển đổi Mongoose Document thành Object và thêm trường image_url
        const postsWithImages = posts.map(post => ({
            ...post.toObject(), // Chuyển đổi Mongoose Document thành Object
            image_url: post.image_url // Đảm bảo trả về trường image_url
        }));

        res.status(HttpStatusCode.OK).json(postsWithImages);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

export const getAllPostsForAdmin = async (req, res) => {
    try {
        const posts = await Post.find() // Lấy các bài viết có trạng thái published
            .populate('tags') // Lấy thông tin tag
            .populate({
                path: 'category_id', // Lấy thông tin danh mục
                select: 'name' // Chỉ lấy trường name
            })
            .populate({
                path: 'user_id', // Lấy thông tin người dùng
                select: 'username' // Chỉ lấy trường username
            });
        const postsWithImages = posts.map(post => ({
            ...post.toObject(), // Chuyển đổi Mongoose Document thành Object
            image_url: post.image_url // Đảm bảo trả về trường image_url
        }));

        res.status(HttpStatusCode.OK).json(postsWithImages);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

//get posts by id
export const getPostById = async (req, res) => {
    const { post_id } = req.params; // Sửa thành post_id
    try {
        const post = await Post.findById(post_id).populate('tags')
            .populate({
                path: 'category_id', // Lấy thông tin danh mục
                select: 'name' // Chỉ lấy trường name
            })
            .populate({
                path: 'user_id', // Lấy thông tin người dùng
                select: 'username' // Chỉ lấy trường username
            });;
        if (!post) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Post not found.' });
        }
        res.status(HttpStatusCode.OK).json(post);
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Update a post
export const updatePostForAdmin = async (req, res) => {
    const { postId } = req.params;
    const { title, content, slug, image_url, status, tags } = req.body;
    const user_id = req.user.id;

    try {
        // Check if the post exists
        const foundPost = await Post.findById(postId);
        if (!foundPost) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Post not found.' });
        }

        // Check access permissions
        if (req.user.role !== 'admin' && user_id !== foundPost.user_id.toString()) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
        }

        // Ensure tags is an array and process them
        const processedTags = Array.isArray(tags) 
            ? tags.map(tag => {
                if (mongoose.Types.ObjectId.isValid(tag)) {
                    return new mongoose.Types.ObjectId(tag);
                }
                throw new Error(`Invalid tag ID: ${tag}`);
            })
            : [];

        // Update the post
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                title,
                content,
                slug,
                image_url,
                status,
                tags: processedTags,
            },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Post not found or not updated.' });
        }

        // Send notification if the post is published
        if (status === 'published' && foundPost.status !== 'published') {
            await sendNewPostNotification(updatedPost);
        }

        console.log("Updated Post from Database:", updatedPost);
        res.status(HttpStatusCode.OK).json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message || 'An error occurred while updating the post.' });
    }
};
export const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, content, slug, status, tags } = req.body;
    const user_id = req.user.id;

    try {
        // Check if the post exists
        const foundPost = await Post.findById(postId);
        if (!foundPost) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Post not found.' });
        }

        // Check access permissions
        if (req.user.role !== 'admin' && user_id !== foundPost.user_id.toString()) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
        }
        const image_url = req.file ? req.file.path : null; // Get image path from multer
        console.log("Image URL before update:", image_url);
        // Ensure tags is an array and process them
        const processedTags = Array.isArray(tags) 
            ? tags.map(tag => {
                if (mongoose.Types.ObjectId.isValid(tag)) {
                    return new mongoose.Types.ObjectId(tag);
                }
                throw new Error(`Invalid tag ID: ${tag}`);
            })
            : [];

        // Update the post
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                title,
                content,
                slug,
                image_url,
                status,
                tags: processedTags,
            },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Post not found or not updated.' });
        }

        // Send notification if the post is published
        if (status === 'published' && foundPost.status !== 'published') {
            await sendNewPostNotification(updatedPost);
        }

        console.log("Updated Post from Database:", updatedPost);

        res.status(HttpStatusCode.OK).json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message || 'An error occurred while updating the post.' });
    }
};
// Delete a post
export const deletePost = async (req, res) => {
    const { postId } = req.params;
    const user_id = req.user.id;
    console.log(postId);
    const foundPost = await Post.findById(postId);

    if (!foundPost) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Post not found.' });
    }

    if (req.user.role !== 'admin' && user_id !== foundPost.user_id.toString()) {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }

    try {
        await Post.findByIdAndDelete(postId);
        res.status(HttpStatusCode.OK).send();
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Like a post
export const likePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Post not found.' });
        }

        if (post.likedBy.includes(userId)) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'You have already liked this post.' });
        }

        post.likedBy.push(userId);
        post.likes += 1;

        await post.save();
        res.status(HttpStatusCode.OK).json(post);
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Unlike a post
export const unlikePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Post not found.' });
        }

        if (!post.likedBy.includes(userId)) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'You have not liked this post.' });
        }

        post.likedBy.pull(userId);
        post.likes -= 1;

        await post.save();
        res.status(HttpStatusCode.OK).json(post);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

/// Get posts by user ID
export const getPostsByUserId = async (req, res) => {
    const { user_id } = req.params; // Lấy user_id từ tham số URL

    try {
        const posts = await Post.find({ user_id }) // Tìm tất cả bài viết của user_id
            .populate('tags')
            .populate({
                path: 'category_id',
                select: 'name'
            })
            .populate({
                path: 'user_id',
                select: 'username'
            });

        // Nếu không có bài viết, trả về mảng rỗng
        res.status(HttpStatusCode.OK).json(posts || []);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Tìm kiếm bài viết
export const getPostsBySearch = async (req, res) => {
    const { query } = req.query; // Lấy giá trị từ query string
    console.log("Query parameter:", query);

    // Kiểm tra xem query có tồn tại không
    if (!query || query.trim() === '') {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Query parameter cannot be empty.' });
    }

    try {
        // Tìm kiếm bài viết theo tiêu đề, nội dung hoặc tên người dùng
        const posts = await Post.find()
            .populate('tags')
            .populate({ path: 'category_id', select: 'name' })
            .populate({ path: 'user_id', select: 'username' });

        // Lọc bài viết theo tiêu đề, nội dung và tên người dùng
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.content.toLowerCase().includes(query.toLowerCase()) ||
            (post.user_id && post.user_id.username.toLowerCase().includes(query.toLowerCase()))
        );

        if (!filteredPosts.length) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'No posts found matching your search.' });
        }

        res.status(HttpStatusCode.OK).json(filteredPosts);
    } catch (error) {
        console.error("Error in getPostsBySearch:", error);
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};


// Get posts by category ID
export const getPostsByCategory = async (req, res) => {
    const { category_id } = req.params; // Lấy category_id từ tham số URL
    console.log("getPostsByCategory", category_id);
    try {
        const posts = await Post.find({ category_id, status: 'published' }) // Tìm tất cả bài viết thuộc category_id và có trạng thái published
            .populate('tags')
            .populate({
                path: 'user_id',
                select: 'username'
            });

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this category.' });
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error in getPostsByCategory:", error);
        res.status(500).json({ error: error.message });
    }
};


// Check if user has liked a post
export const hasUserLikedPost = async (req, res) => {
    const { post_id } = req.params; // Lấy post_id từ tham số URL
    const userId = req.user.id; // Lấy user_id từ thông tin người dùng đã xác thực

    try {
        const post = await Post.findById(post_id);

        if (!post) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Post not found.' });
        }

        const hasLiked = post.likedBy.includes(userId); // Kiểm tra xem user_id có trong likedBy hay không

        res.status(HttpStatusCode.OK).json({ hasLiked });
    } catch (error) {
        console.error('Error checking like status:', error);
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};


// Get statistics for admin
export const getStatistics = async (req, res) => {
    try {
        // Tổng số bài viết
        const totalPosts = await Post.countDocuments();

        // Tổng số bài viết đã xuất bản
        const totalPublishedPosts = await Post.countDocuments({ status: 'published' });

        // Số lượng bài viết theo trạng thái
        const postsByStatus = await Post.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        // Số lượng bài viết theo từng tác giả
        const postsByAuthor = await Post.aggregate([
            { $group: { _id: "$user_id", count: { $sum: 1 } } },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'authorInfo' } },
            { $unwind: '$authorInfo' },
            { $project: { username: '$authorInfo.username', count: 1 } }
        ]);

        // Số lượng bài viết theo danh mục
        const postsByCategory = await Post.aggregate([
            { $group: { _id: "$category_id", count: { $sum: 1 } } },
            { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'categoryInfo' } },
            { $unwind: '$categoryInfo' },
            { $project: { categoryName: '$categoryInfo.name', count: 1 } }
        ]);

        // Gộp tất cả thông tin thống kê
        const statistics = {
            totalPosts,
            totalPublishedPosts,
            postsByStatus,
            postsByAuthor,
            postsByCategory
        };

        res.status(HttpStatusCode.OK).json(statistics);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};