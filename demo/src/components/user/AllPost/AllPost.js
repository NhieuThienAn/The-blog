<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../../api/api';
import Loading from '../Loading/Loading';
import './AllPost.scss';

=======
// src/components/AllPostList/AllPostList.js

import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../../api/api';
import Loading from '../Loading/Loading';
import { Input, Card, Col, Row, Empty, Typography, Select } from 'antd';
import './AllPost.scss';

const { Title, Paragraph } = Typography;
const { Option } = Select;

>>>>>>> 086163e (74% done)
const AllPostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD
=======
    const [columns, setColumns] = useState(3); // Default columns
>>>>>>> 086163e (74% done)

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
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

<<<<<<< HEAD
=======
    const handleColumnChange = (value) => {
        setColumns(value);
    };

>>>>>>> 086163e (74% done)
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className="all-post-error-message">{error}</p>;
    }

    return (
        <div className="all-post-container">
<<<<<<< HEAD
            <h2 className="all-post-search-title">Search Posts</h2>
            <input
                type="text"
=======
            <Title level={2} className="all-post-search-title">Search Posts</Title>
            <Input
>>>>>>> 086163e (74% done)
                placeholder="Search by title or content..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="all-post-search-input"
<<<<<<< HEAD
            />
            <div className="all-posts-list-wrapper">
                {filteredPosts.length === 0 ? (
                    <p className="all-post-no-posts-message">No posts found matching your search criteria.</p>
                ) : (
                    <ul className="all-posts-list-container">
                        {filteredPosts.map(post => (
                            <li key={post._id} className="all-post-item">
                                <img src={`http://localhost:3001/${post.image_url}`} alt="Post Thumbnail" className="all-post-thumbnail" />
                                <a href={`/posts/${post._id}`} className="all-post-title">{post.title}</a>
                                <p className="all-post-excerpt">{post.content.length > 50 ? `${post.content.substring(0, 90)}...` : post.content}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
=======
                style={{ marginBottom: '20px' }}
            />
            <Select
                defaultValue={3}
                style={{ width: 120, marginBottom: '20px' }}
                onChange={handleColumnChange}
            >
                <Option value={2}>1 cột</Option>
                <Option value={3}>2 cột</Option>
                <Option value={4}>3 cột</Option>
            </Select>
            <Row gutter={[16, 16]} className="all-posts-list-wrapper">
                {filteredPosts.length === 0 ? (
                    <Empty description="No posts found matching your search criteria." />
                ) : (
                    filteredPosts.map(post => (
                        <Col span={24 / columns} key={post._id}>
                            <Card
                                hoverable
                                cover={<img alt="Post Thumbnail" src={`http://localhost:3001/${post.image_url}`} />}
                            >
                                <Card.Meta
                                    title={<a href={`/posts/${post._id}`} className="all-post-title">{post.title}</a>}
                                    description={
                                        <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                                            {post.content.length > 50 ? `${post.content.substring(0, 90)}...` : post.content}
                                        </Paragraph>
                                    }
                                />
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
>>>>>>> 086163e (74% done)
        </div>
    );
};

export default AllPostList;