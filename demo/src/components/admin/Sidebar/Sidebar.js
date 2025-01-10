import './Sidebar.scss';
import React, { useEffect, useState, useMemo } from 'react';
import { MailOutlined, UserOutlined, CaretLeftOutlined, CaretRightOutlined, LogoutOutlined, TagsOutlined, LinkOutlined } from '@ant-design/icons';
import { Menu, Modal, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import thư viện js-cookie

const Sidebar = () => {
    const [current, setCurrent] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const path = location.pathname;

        if (path.includes('/admin/users')) {
            setCurrent('users');
        } else if (path.includes('/admin/tags')) {
            setCurrent('tags');
        } else if (path.includes('/admin/categories')) {
            setCurrent('categories');
        } else if (path.includes('/admin/posts')) {
            setCurrent('posts');
        }
    }, [location]);

    const handleClick = (e) => {
        setCurrent(e.key);

        switch (e.key) {
            case 'posts':
                navigate('/admin/posts');
                break;
            case 'users':
                navigate('/admin/users');
                break;
            case 'tags':
                navigate('/admin/tags');
                break;
            case 'categories':
                navigate('/admin/categories');
                break;
            case 'logout':
                showModal();
                break;
            default:
                break;
        }
    };

    const showModal = () => {
        Modal.confirm({
            title: 'Xác nhận đăng xuất',
            content: 'Bạn có chắc chắn muốn đăng xuất?',
            okText: 'Đăng xuất',
            cancelText: 'Hủy',
            onOk: handleLogout,
            onCancel() {
                message.info('Đăng xuất bị hủy.');
            },
        });
    };

    const handleLogout = () => {
        Cookies.remove('username');
        Cookies.remove('user_id');
        Cookies.remove('email');
        Cookies.remove('avatar_url');
        Cookies.remove('token'); // Xóa token nếu cần
        navigate('/login');
    };

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const user = {
        name: Cookies.get('username') || 'Người dùng',
        role: 'Quản trị viên',
        email: Cookies.get('email') || 'Chưa có email',
        avatar: 'https://via.placeholder.com/50',
    };

    const items = useMemo(() => [
        { key: 'posts', label: 'Quản lý Bài viết', icon: <MailOutlined /> },
        { key: 'users', label: 'Quản lý Người dùng', icon: <UserOutlined /> },
        { key: 'tags', label: 'Quản lý Thẻ', icon: <TagsOutlined /> },
        { key: 'categories', label: 'Quản lý Danh mục', icon: <LinkOutlined /> },
        { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined /> },
    ], []);

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="user-info">
                <img src={user.avatar} alt="Avatar" className="avatar" />
                <div className="user-details">
                    <h3 className="user-name">{user.name}</h3>
                    <p className="user-role">{user.role}</p>
                    <p className="user-email">{user.email}</p>
                </div>
            </div>
            <Menu
                theme="dark"
                onClick={handleClick}
                className="menu"
                selectedKeys={[current]}
                mode="inline"
                items={items}
            />
            <button className="toggle-button" onClick={toggleSidebar}>
                {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
            </button>
        </div>
    );
};

export default Sidebar;