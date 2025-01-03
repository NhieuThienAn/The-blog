<<<<<<< HEAD
// src/components/ThemeFilter/ThemeFilter.js

import React, { useEffect, useState } from 'react';
import { getAllPosts, getAllCategories, getPostsByCategory } from '../../../api/api'; // Thay đổi đường dẫn nếu cần
import './ThemeFilter.scss';

const ThemeFilter = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [themes, setThemes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState('Tất cả');
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');

    useEffect(() => {
        const fetchPostsAndCategories = async () => {
            try {
                const postResponse = await getAllPosts();
                const categoryResponse = await getAllCategories();

                setPosts(postResponse.data);
                setCategories(['Tất cả', ...categoryResponse.data]);

                const uniqueThemes = [...new Set(postResponse.data.map(post => post.theme))];
                setThemes(['Tất cả', ...uniqueThemes]);
            } catch (error) {
                console.error("Error fetching posts or categories:", error);
            }
        };

        fetchPostsAndCategories();
    }, []);

    useEffect(() => {
        const fetchFilteredPosts = async () => {
            let filtered = posts;

            try {
                if (selectedCategory !== 'Tất cả') {
                    const categoryResponse = await getPostsByCategory(selectedCategory);
                    filtered = categoryResponse.data;
                } else {
                    // Nếu chọn "Tất cả", sẽ sử dụng tất cả bài viết
                    filtered = posts;
                }
            } catch (error) {
                console.error("Error fetching posts by category:", error.response ? error.response.data : error.message);
                return; // Dừng nếu có lỗi
            }

            const finalFiltered = filtered.filter(post => {
                const matchesTheme = selectedTheme === 'Tất cả' || post.theme === selectedTheme;
                return matchesTheme;
            });

            setFilteredPosts(finalFiltered);
        };

        fetchFilteredPosts();
    }, [selectedTheme, selectedCategory, posts]);

    const handleThemeChange = (event) => {
        setSelectedTheme(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
=======
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
>>>>>>> 086163e (74% done)
    };

    return (
        <div className="theme-filter-container">
<<<<<<< HEAD
            <h1>Lọc bài viết theo chủ đề và danh mục</h1>
            <div className="filter-selects">
                <select className="theme-select" onChange={handleThemeChange}>
                    {themes.map((theme, index) => (
                        <option key={index} value={theme}>{theme}</option>
                    ))}
                </select>

                <select className="category-select" onChange={handleCategoryChange}>
                    {categories.map((category, index) => (
                        <option key={index} value={category._id}>{category.name}</option> // Đảm bảo sử dụng _id
                    ))}
                </select>
            </div>

            <div className="post-list">
                {filteredPosts.length === 0 ? (
                    <p className="no-posts-message">Không có bài viết nào cho lựa chọn này.</p>
                ) : (
                    filteredPosts.map(post => (
                        <div className="post-item" key={post._id}>
                            <img src={`http://localhost:3001/${post.image_url}`} alt="Post Thumbnail" className="post-image" />
                            <h2 className="post-title">{post.title}</h2>
                            <p className="post-content">{post.content.length > 90 ? `${post.content.substring(0, 90)}...` : post.content}</p>
                        </div>
=======
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
>>>>>>> 086163e (74% done)
                    ))
                )}
            </div>
        </div>
    );
};

export default ThemeFilter;