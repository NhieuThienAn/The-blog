import React, { useEffect, useState } from 'react';
import { Select, Card, Empty } from 'antd';
import { getAllPosts, getAllCategories, getPostsByCategory } from '../../../api/api'; // Adjust path if necessary
import './ThemeFilter.scss';

const { Option } = Select;

const ThemeFilter = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryResponse = await getAllCategories();
                setCategories(['Tất cả', ...categoryResponse.data]);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (selectedCategory !== 'Tất cả') {
                    const categoryResponse = await getPostsByCategory(selectedCategory);
                    setFilteredPosts(categoryResponse.data);
                } else {
                    const postResponse = await getAllPosts();
                    setFilteredPosts(postResponse.data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [selectedCategory]);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    return (
        <div className="theme-filter-container">
            <h1>Lọc bài viết theo danh mục</h1>
            <Select
                defaultValue="Tất cả"
                style={{ width: 200, marginBottom: 20 }}
                onChange={handleCategoryChange}
            >
                {categories.map((category, index) => (
                    <Option key={index} value={category._id}>{category.name}</Option>
                ))}
            </Select>

            <div className="post-list">
                {filteredPosts.length === 0 ? (
                    <Empty description="Không có bài viết nào cho lựa chọn này." />
                ) : (
                    filteredPosts.map(post => (
                        <Card
                            key={post._id}
                            hoverable
                            style={{ width: 300, marginBottom: 20 }}
                            cover={<img alt="Post Thumbnail" src={`http://localhost:3001/${post.image_url}`} />}
                        >
                            <Card.Meta title={post.title} description={post.content.length > 90 ? `${post.content.substring(0, 90)}...` : post.content} />
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ThemeFilter;