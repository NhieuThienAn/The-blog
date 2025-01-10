import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, Select, Typography, message, Image } from 'antd';
import { getUsersById, createPost, updateUser, getAllCategories, getAllTags, getPostsByUserId } from '../../../api/api';
import Loading from '../Loading/Loading';
import Cookies from 'js-cookie'; // Import thư viện js-cookie

import './Profile.scss';

const { TextArea } = Input;
const { Option } = Select;

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [showDrafts, setShowDrafts] = useState(false);
    const [editUserData, setEditUserData] = useState({ name: '', email: '', phone: '', bio: '' });

    const role = Cookies.get('role');
    const userId = Cookies.get('user_id');
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, postsResponse, categoriesResponse, tagsResponse] = await Promise.all([
                    getUsersById(userId),
                    getPostsByUserId(userId),
                    getAllCategories(),
                    getAllTags(),
                ]);
                setUser(userResponse.data);
                // Kiểm tra nếu không có bài viết nào
                if (postsResponse.data && postsResponse.data.length > 0) {
                    setPosts(postsResponse.data);
                } else {
                    setPosts([]); // Set posts thành mảng rỗng nếu không có bài viết
                    message.info("Bạn chưa có bài viết nào.");
                }
                setCategories(categoriesResponse.data);
                setAllTags(tagsResponse.data);
                setEditUserData({
                    name: userResponse.data.username,
                    email: userResponse.data.email,
                    phone: userResponse.data.phone,
                    bio: userResponse.data.bio || '',
                });
            } catch (err) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const openEditModal = () => {
        setEditUserData({
            name: user?.username || '',
            email: user?.email || '',
            phone: user?.phone || '',
            bio: user?.bio || '',
        });
        setIsEditModalVisible(true);
    };

    const closeEditModal = () => setIsEditModalVisible(false);

    const handleTagChange = (value) => {
        setSelectedTags(value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarFile(file);
        }
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return regex.test(email);
    };

    const handleUserUpdate = async () => {
        try {
            // Validate inputs
            if (!editUserData.name || !editUserData.email) {
                message.error('Tên và email là bắt buộc.');
                return;
            }
            if (!validateEmail(editUserData.email)) {
                message.error('Email phải có định dạng @gmail.com.');
                return;
            }
            await updateUser(userId, editUserData, token);
            setUser({ ...user, ...editUserData });
            message.success('Thông tin người dùng đã được cập nhật thành công!');
            closeEditModal();
        } catch (error) {
            console.error("Error updating user:", error);
            message.error('Cập nhật thông tin thất bại.');
        }
    };

    const handleSubmit = async () => {
        // Validate inputs
        if (!title || !content || !category) {
            message.error('Tiêu đề, nội dung và danh mục là bắt buộc.');
            return;
        }

        const postData = new FormData();
        postData.append('title', title.trim());
        postData.append('content', content.trim());
        postData.append('category_id', category);
        selectedTags.forEach(tag => postData.append('tags[]', tag));

        const slug = title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        postData.append('user_id', userId);
        postData.append('slug', slug);

        if (imageFile) {
            postData.append('image', imageFile);
        }

        try {
            const response = await createPost(postData, token);
            setPosts(prevPosts => [...prevPosts, response.data]);
            message.success('Đăng bài viết thành công!');
            closeModal();
        } catch (error) {
            setError("Failed to create post. Please try again later.");
            console.error("Error creating post:", error);
            message.error('Đăng bài viết thất bại.');
        }
        window.location.reload();
    };

    if (loading) return <Loading />;
    if (error) return <div>{error}</div>;

    const publishedPosts = posts.filter(post => post.status !== 'draft');
    const draftPosts = posts.filter(post => post.status === 'draft');

    return (
        <div className="user-profile-layout">
            <div className="user-profile-section">
                {user && (
                    <div className="user-profile-details-container">
                        <img className="user-profile-avatar-image" src={`http://localhost:3001/${user.avatar_url}`} alt="Avatar" />
                        <div className='user-profile-info'>
                            <p><strong>Name:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Bio:</strong> {user.bio || 'Chưa có thông tin'}</p>
                            <Button type="primary" onClick={openEditModal}>Chỉnh sửa thông tin</Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="user-posts-section">
                <div className='user-posts-content'>
                    <h2 className="user-posts-heading">Bài viết của {user.username}</h2>
                    <Button type="primary" onClick={openModal} className="user-create-post-button">Đăng bài</Button>

                    <Button
                        type={showDrafts ? "default" : "dashed"}
                        onClick={() => { setShowDrafts(false); }}
                        className="user-create-post-button-toggle-button"
                    >
                        Hiện Bài Viết Đã Xuất Bản
                    </Button>

                    <Button
                        type={showDrafts ? "dashed" : "default"}
                        onClick={() => { setShowDrafts(true); }}
                        className="user-create-post-button-toggle-button"
                    >
                        Hiện Bài Viết Draft
                    </Button>

                    <h3>{showDrafts ? "Bài Viết Draft" : "Bài Viết Đã Xuất Bản"}</h3>
                    <ul className="user-posts-list">
                        {(showDrafts ? draftPosts : publishedPosts).length === 0 ? (
                            <p className="no-posts-message">
                                {showDrafts ? "Bạn chưa có bài viết nào ở trạng thái draft." : "Bạn chưa có bài viết nào."}
                            </p>
                        ) : (
                            (showDrafts ? draftPosts : publishedPosts).map((post) => (
                                <li className={`user-post-item ${post.status === 'draft' ? 'draft' : ''}`} key={post._id}>
                                    <img
                                        src={post.image_url ? `http://localhost:3001/${post.image_url}` : 'default-image-url.jpg'}
                                        alt="user-post Thumbnail"
                                        className="user-post-thumbnail-image"
                                    />
                                    <a href={`/posts/${post._id}/edit`} className="user-post-title-link">{post.title}</a>
                                    <p className="user-post-content-summary">
                                        {post.content.length > 100 ? `${post.content.substring(0, 170)}...` : post.content}
                                    </p>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            {/* Modal for creating a new post */}
            <Modal
                title="Tạo Bài Viết Mới"
                open={isModalVisible}
                onOk={handleSubmit}
                onCancel={closeModal}
                centered
                className="post-creation-modal"
            >
                <h4>Tiêu đề bài viết</h4>
                <Input
                    placeholder="Tiêu đề bài viết"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <h4>Nội dung bài viết</h4>
                <TextArea
                    rows={4}
                    placeholder="Nội dung bài viết"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <h4>Danh mục</h4>
                <Select
                    placeholder="Chọn danh mục"
                    value={category}
                    onChange={setCategory}
                    style={{ width: '100%' }}
                >
                    {categories.map((cat) => (
                        <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                    ))}
                </Select>

                <h4>Thẻ (tags)</h4>
                <Select
                    mode="multiple"
                    placeholder="Chọn thẻ"
                    value={selectedTags}
                    onChange={handleTagChange}
                    style={{ width: '100%' }}
                >
                    {allTags.map((tag) => (
                        <Option key={tag._id} value={tag.name}>{tag.name}</Option>
                    ))}
                </Select>

                <h4>Hình ảnh</h4>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ width: '100%' }}
                />
            </Modal>

            {/* Modal for editing user information */}
            <Modal
                title="Chỉnh Sửa Thông Tin Người Dùng"
                open={isEditModalVisible}
                onOk={handleUserUpdate}
                onCancel={closeEditModal}
                centered
                className="user-edit-modal"
            >
                <h4>Tên</h4>
                <Input
                    value={editUserData.name}
                    onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })}
                />

                <h4>Email</h4>
                <Input
                    value={editUserData.email}
                    onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                />

                <h4>Thông tin cá nhân (Bio)</h4>
                <TextArea
                    value={editUserData.bio}
                    onChange={(e) => setEditUserData({ ...editUserData, bio: e.target.value })}
                    placeholder="Nhập thông tin cá nhân"
                    rows={4}
                />

                <h4>Hình ảnh Avatar</h4>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ width: '100%' }}
                />
            </Modal>
        </div>
    );
};

export default UserProfile;
