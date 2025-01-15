import './Sidebar.scss';
import React, { useEffect, useState, useMemo } from 'react';
import { MailOutlined, UserOutlined, CaretLeftOutlined, CaretRightOutlined, LogoutOutlined, TagsOutlined, LinkOutlined, BarChartOutlined } from '@ant-design/icons'; // Thêm BarChartOutlined cho mục thống kê
import { Menu, Modal, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

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
        } else if (path.includes('/admin/statistics')) { // Thêm điều kiện cho thống kê
            setCurrent('statistics');
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
            case 'statistics': // Thêm điều kiện cho thống kê
                navigate('/admin/statistics');
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
        Cookies.remove('role'); 
        navigate('/posts');
    };

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const user = {
        name: Cookies.get('username') || 'Người dùng',
        role: 'Quản trị viên',
        email: Cookies.get('email') || 'Chưa có email',
        avatar: 'http://localhost:3001/uploads/1735806104615.jpg',
    };

    const items = useMemo(() => [
        { key: 'posts', label: 'Quản lý Bài viết', icon: <MailOutlined /> },
        { key: 'users', label: 'Quản lý Người dùng', icon: <UserOutlined /> },
        { key: 'tags', label: 'Quản lý Thẻ', icon: <TagsOutlined /> },
        { key: 'categories', label: 'Quản lý Danh mục', icon: <LinkOutlined /> },
        { key: 'statistics', label: 'Thống kê', icon: <BarChartOutlined /> }, // Thêm mục Thống kê
        { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined /> },
    ], []);

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="user-info">
                <img src={user.avatar} alt="Avatar" className="avatar" />
                <div className="user-details">
                    <h3 className="user-name">{user.name}</h3>
                    <p className="user-role">{user.role}</p>
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
        </div>
    );
};

export default Sidebar;