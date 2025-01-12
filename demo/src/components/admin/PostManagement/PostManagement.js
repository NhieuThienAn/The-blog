import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPostsForAdmin } from '../../../api/api';
import Sidebar from '../../admin/Sidebar/Sidebar';
import { Button } from 'antd';
import Loading from '../Loading/Loading';
import './PostManagement.scss';
import Cookies from 'js-cookie'; // Import thư viện js-cookie

const PostManagement = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDrafts, setShowDrafts] = useState(false); // State to toggle between drafts and published
    const role = Cookies.get('role');  
    const token = Cookies.get('token');

    if (role === 'user') {
        setError("Lỗi quyền hạn");
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

    if (!posts) {
        return <Loading />;
    }

    // Filter posts based on the showDrafts state
    const displayedPosts = showDrafts ? filteredPosts.filter(post => post.status === 'draft') : filteredPosts.filter(post => post.status !== 'draft');

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
                <div className="toggle-buttons">
                    <Button
                        type={showDrafts ? "dashed" : "primary"}
                        onClick={() => setShowDrafts(false)}
                        style={{marginRight: 30}}
                    >
                        Hiện Bài Viết Đã Xuất Bản
                    </Button>
                    <Button
                        type={showDrafts ? "primary" : "dashed"}
                        onClick={() => setShowDrafts(true)}
                    >
                        Hiện Bài Viết Draft
                    </Button>
                </div>
                <ul className="post-list">
                    {displayedPosts.length > 0 ? (
                        displayedPosts.map(post => (
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
                        ))
                    ) : (
                        <p className="no-posts-message">
                            {showDrafts ? "Bạn chưa có bài viết nào ở trạng thái draft." : "Bạn chưa có bài viết nào đã xuất bản."}
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PostManagement;