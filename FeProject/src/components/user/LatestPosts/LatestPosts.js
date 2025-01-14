import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../../../api/api';
import Loading from '../Loading/Loading';
import './LatestPosts.scss';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const LatestPosts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const postLayoutRef = useRef(null); // Tạo ref cho khu vực bài viết

    useEffect(() => {
        const fetchLatestPosts = async () => {
            setLoading(true);
            try {
                const response = await getAllPosts();
                const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setPosts(sortedPosts.slice(0, 5)); // Lấy 5 bài viết mới nhất
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchLatestPosts();
    }, [navigate]);
    useEffect(() => {
        const handleScroll = () => {
            const items = document.querySelectorAll('.latest-post-item');
            const windowHeight = window.innerHeight;

            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                // Kiểm tra nếu bài viết nằm trong tầm nhìn
                if (rect.top < windowHeight && rect.bottom > 0) {
                    item.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Gọi hàm ngay lần đầu để kiểm tra các bài viết đã ở trong tầm nhìn

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [posts]);
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="latest-posts-container">
            <h2 className="latest-posts-title">Bài viết mới nhất</h2>
            {posts.length === 0 ? (
                <p className="latest-no-posts-message">Không có bài viết nào để hiển thị.</p>
            ) : (
                <>
                    <div className="latest-posts-layout" ref={postLayoutRef}>
                        {posts.map(post => (
                            <div className="latest-post-item" key={post._id}>
                                <img src={`http://localhost:3001/${post.image_url}`} alt="Post Thumbnail" className="latest-post-image" />
                                <a href={`/posts/${post._id}`} className="latest-post-title">{post.title}</a>
                                <p className="latest-post-content">{post.content.length > 50 ? `${post.content.substring(0, 90)}...` : post.content}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LatestPosts;