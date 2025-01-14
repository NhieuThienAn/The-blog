import React, { useEffect, useState } from 'react';
import { Select, Empty, Spin, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { getAllPosts, getAllCategories, getPostsByCategory } from '../../../api/api';
import './ThemeFilter.scss';

const { Option } = Select;
const { Title, Paragraph } = Typography;

const ThemeFilter = () => {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryResponse = await getAllCategories();
                setCategories([{ _id: 'all', name: 'Tất cả' }, ...categoryResponse.data]);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = selectedCategory !== 'all'
                    ? await getPostsByCategory(selectedCategory)
                    : await getAllPosts();

                setFilteredPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setFilteredPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [selectedCategory]);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    return (
        <div className="theme-filter-container">
            <Title level={1}>Lọc bài viết theo danh mục</Title>
            <Select
                defaultValue="all"
                style={{ width: 300, marginBottom: 20 }}
                onChange={handleCategoryChange}
            >
                {categories.map((category) => (
                    <Option key={category._id} value={category._id}>{category.name}</Option>
                ))}
            </Select>

            {loading ? (
                <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />
            ) : (
                <div className="post-list">
                    {filteredPosts.length === 0 ? (
                        <Empty style={{height:"47vh"}} description="Không có bài viết nào cho lựa chọn này." />
                    ) : (
                        filteredPosts.map(post => (
                            <Card
                                key={post._id}
                                hoverable
                                style={{ margin: '10px', width: 350 }}
                                cover={<img alt="Post Thumbnail" src={`http://localhost:3001/${post.image_url}`} />}
                            >
                                <Link to={`/posts/${post._id}`}>
                                    <Title level={4}>{post.title}</Title>
                                </Link>
                                <Paragraph>{post.content.length > 90 ? `${post.content.substring(0, 90)}...` : post.content}</Paragraph>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ThemeFilter;