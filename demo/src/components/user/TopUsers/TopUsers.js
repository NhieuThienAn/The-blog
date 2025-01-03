// src/components/TopUsers/TopUsers.js

import React, { useEffect, useState } from 'react';
import { getTopUsersByLikes } from '../../../api/api';
import { Card, Row, Col, Typography, Spin } from 'antd';

const { Title } = Typography;

const TopUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchTopUsers = async () => {
            setLoading(true);
            try {
                const response = await getTopUsersByLikes();
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching top users:", error);
                setError("Failed to load users. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTopUsers();
    }, []);

    if (loading) {
        return <Spin />;
    }

    if (error) {
        return <p>{error}</p>;
    }
    if (users.length === 0) {
        return <p>No users found.</p>; // Thông báo nếu không có người dùng
    }
    return (
        <div>
            <Title level={2}>Top 3 Users by Likes</Title>
            <Row gutter={16}>
                {users.map(user => (
                    <Col span={8} key={user.user_id}> {/* Sử dụng user.user_id */}
                        <Card title={user.username}>
                            <p>Total Likes: {user.totalLikes}</p>
                            <p>Email: {user.email}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default TopUsers;