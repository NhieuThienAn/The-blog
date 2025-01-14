import React, { useEffect, useState } from 'react';
import { List, Avatar, Spin, Typography, Alert } from 'antd';
import { getTopUsersByPosts } from '../../../api/api'; // Adjust the path as needed
import './TopUsers.scss';

const { Title } = Typography;

const TopUsers = () => {
    const [topUsers, setTopUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const response = await getTopUsersByPosts();
                setTopUsers(response.data);
                console.log(response.data);
            } catch (err) {
                setError('Failed to load top users.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopUsers();
    }, []);

    if (loading) return <Spin tip="Loading..." className="top-users-loading" />;
    if (error) return <Alert message={error} type="error" showIcon className="top-users-error" />;
    if (!topUsers.length) return <p className="top-users-empty">No top users found.</p>;

    return (
        <div className="top-users-container">
            <Title level={2} className="top-users-title">Top các tác giả của tháng</Title>
            <List
                itemLayout="horizontal"
                dataSource={topUsers}
                renderItem={user => (
                    <List.Item className="top-users-item">
                        <List.Item.Meta
                            avatar={
                                <div className="top-users-avatar">
                                    <Avatar src={`http://localhost:3001/${user.avatar_url}`} />
                                </div>
                            }
                            title={<strong className="top-users-username">{user.username}</strong>}
                            description={`Email: ${user.email} - Posts: ${user.postCount}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default TopUsers;