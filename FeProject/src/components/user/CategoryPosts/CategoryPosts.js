import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPostsByCategory, getAllCategories } from '../../../api/api';
import Loading from '../Loading/Loading';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Card, Button, Typography, Empty } from 'antd';
import './CategoryPosts.scss';

const { Title, Paragraph } = Typography;

const CategoryPosts = ({ categoryId }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const postLayoutRef = useRef(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const categoryResponse = await getAllCategories();
                const categories = categoryResponse.data;
                const currentCategory = categories.find(category => category._id === categoryId);
                setCategoryName(currentCategory ? currentCategory.name : 'Danh mục không xác định');
                const response = await getPostsByCategory(categoryId);
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [categoryId]);

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

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="category-post-list-container">
            <Title level={2} className="category-post-list-title">Các bài viết về {categoryName}</Title>
            {posts.length === 0 ? (
                <Empty description="Không có bài viết nào để hiển thị." />
            ) : (
                <>
                    <div className="category-post-layout" ref={postLayoutRef} style={{ display: 'flex', overflowX: 'scroll' }}>
                        {posts.map(post => (
                            <Card
                                key={post._id}
                                hoverable
                                style={{ margin: '10px', width: 300 }}
                                cover={<img alt="Post Thumbnail" src={`http://localhost:3001/${post.image_url}`} />}
                                onClick={() => navigate(`/posts/${post._id}`)}
                            >
                                <Title level={4}>{post.title}</Title>
                                <Paragraph>{post.content.length > 90 ? `${post.content.substring(0, 90)}...` : post.content}</Paragraph>
                            </Card>
                        ))}
                    </div>
                    {posts.length > 5 && (
                        <div className="category-button-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <Button type="primary" onClick={scrollLeft} icon={<ArrowLeftOutlined />} />
                            <Button type="primary" onClick={scrollRight} icon={<ArrowRightOutlined />} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CategoryPosts;