import React, { useEffect, useState } from 'react';
import { getAllUsers, lockUser, unlockUser } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../admin/Sidebar/Sidebar';
import { Modal, Table, Button } from 'antd';
import './UserManagement.scss';
import Cookies from 'js-cookie'; // Import thư viện js-cookie

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [actionType, setActionType] = useState('');
    const navigate = useNavigate();
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                const filteredUsers = response.data.filter(user => user.role !== 'admin');
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Failed to load users. Please try again later.");
            }
        };

        fetchUsers();
    }, []);

    const showModal = (userId, type) => {
        setCurrentUserId(userId);
        setActionType(type);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            if (actionType === 'lock') {
                await lockUser(currentUserId, token);
                setUsers(users.map(user =>
                    user._id === currentUserId ? { ...user, locked: true } : user
                ));
            } else if (actionType === 'unlock') {
                await unlockUser(currentUserId, token);
                setUsers(users.map(user =>
                    user._id === currentUserId ? { ...user, locked: false } : user
                ));
            }
        } catch (error) {
            console.error(`Error ${actionType}ing user:`, error);
            setError(`Failed to ${actionType} user. Please try again later.`);
        } finally {
            setIsModalVisible(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'locked',
            key: 'locked',
            render: (text) => (text ? "Đã khóa" : "Hoạt động"),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, user) => (
                <>
                    {user.locked ? (
                        <Button type="primary" onClick={() => showModal(user._id, 'unlock')}>
                            Mở khóa
                        </Button>
                    ) : (
                        <Button type="dashed" onClick={() => showModal(user._id, 'lock')}>
                            Khóa
                        </Button>
                    )}
                </>
            ),
        },
    ];

    return (
        <div className="user-management-container">
            <Sidebar />
            <div className="user-management-content">
                <h2>Quản lý Người dùng</h2>
                <Table className="user-table" dataSource={users} columns={columns} rowKey="_id" />

                <Modal
                    title={`Xác nhận ${actionType === 'lock' ? 'khóa' : 'mở khóa'} người dùng`}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>Bạn có chắc chắn muốn {actionType === 'lock' ? 'khóa' : 'mở khóa'} người dùng này?</p>
                </Modal>
            </div>
        </div>
    );
};

export default UserManagement;