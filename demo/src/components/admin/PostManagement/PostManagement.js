// PostManagement.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPostsForAdmin } from '../../../api/api';
import Sidebar from '../../admin/Sidebar/Sidebar';
import { Button } from 'antd';
import './PostManagement.scss';

const PostManagement = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const role = Cookies.get('role');  // Lấy quyền người dùng từ local storage
    const token = Cookies.get('token');

    if (role === 'user') {
        setError("lỗi quyền hạn");
    }
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPostsForAdmin(token);
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    console.error("Invalid posts data:", response.data);
                    setError("Invalid data format.");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts. Please try again later.");
            }
        };

        fetchPosts();
    }, [navigate, token]); // Thêm token vào dependencies

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return <p className="error-message">{error}</p>;
    }
    return (
        <div className="post-management-container">
            <Sidebar />
            <div className="content">
                <h2 className="post-management-title">Quản lý Bài viết</h2>
                <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <ul className="post-list">
                    {filteredPosts.map(post => (
                        <li className="post-item" key={post._id}>
                            <img
                                src={`http://localhost:3001/${post.image_url}`} // Đảm bảo đường dẫn chính xác
                                alt="Post Thumbnail"
                                className="post-image"
                            />
                            <a href={`/admin/posts/${post._id}`} className="post-title">{post.title}</a>
                            <p className="post-content">{post.content.length > 50 ? `${post.content.substring(0, 90)}...` : post.content}</p>
                            <Button onClick={() => navigate(`/admin/posts/${post._id}`)}>Chi tiết</Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostManagement;