import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../../../api/api';
import Loading from '../Loading/Loading';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './RecommendPost.scss';

const RecommendPost = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const postLayoutRef = useRef(null); 

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await getAllPosts();
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [navigate]);

    const scrollRight = () => {
        if (postLayoutRef.current) {
            postLayoutRef.current.scrollBy({ left: 250, behavior: 'smooth' }); 
        }
    };
    const scrollLeft = () => {
        if (postLayoutRef.current) {
            postLayoutRef.current.scrollBy({ left: -250, behavior: 'smooth' }); 
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const items = document.querySelectorAll('.new-post-item');
            const windowHeight = window.innerHeight;

            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top < windowHeight && rect.bottom > 0) {
                    item.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); 

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
        <div className="new-post-list-container">
            <h2 className="new-post-list-title">Bài viết đề xuất</h2>
            {posts.length === 0 ? (
                <p className="new-no-posts-message">Không có bài viết nào để hiển thị.</p>
            ) : (
                <>
                    <div className="new-post-layout" ref={postLayoutRef}>
                        {posts.map(post => (
                            <div className="new-post-item" key={post._id}>
                                <img src={`http://localhost:3001/${post.image_url}`} alt="Post Thumbnail" className="new-post-image" />
                                <a href={`/posts/${post._id}`} className="new-post-title">{post.title}</a>
                                <p className="new-post-content">{post.content.length > 50 ? `${post.content.substring(0, 90)}...` : post.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className="new-button-container">
                        <button className="new-view-more-button" onClick={scrollLeft}>
                            <ArrowLeftOutlined />
                        </button>
                        <button className="new-view-more-button" onClick={scrollRight}>
                            <ArrowRightOutlined />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default RecommendPost;