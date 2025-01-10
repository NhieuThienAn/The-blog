import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { BsPostcard } from "react-icons/bs";
import { PiPlanetFill } from "react-icons/pi";
import { getAllPosts, getUsersById } from '../../../api/api';
import { Button, Modal, message } from 'antd';
import Cookies from 'js-cookie'; // Import thư viện js-cookie
import './Header.scss';
const Header = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    const username = Cookies.get('username');
    const user_id = Cookies.get('user_id');
    const email = Cookies.get('email');
    const avatar_url = Cookies.get('avatar_url');

    const showModal = () => {
        Modal.confirm({
            title: 'Xác nhận đăng xuất',
            content: 'Bạn có chắc chắn muốn đăng xuất?',
            onOk: handleLogout,
            onCancel() {
                message.info('Đăng xuất bị hủy.');
            },
        });
    };

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                await getUsersById(user_id);
            } catch (error) {
                console.error("Error fetching user:", error);
                setError("Failed to load user information.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [user_id]);

    const handleLogout = () => {
        Cookies.remove('username');
        Cookies.remove('user_id');
        Cookies.remove('email');
        Cookies.remove('avatar_url');
        Cookies.remove('token'); // Xóa token nếu cần
        navigate('/login');
    };

    const toggleLogoutButton = () => {
        setIsClicked(prev => !prev);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <header className="header">
                <span className="header-icon" onClick={scrollToTop}>
                    <PiPlanetFill />
                </span>
                <nav className="nav">
                    <Link className="nav-link" to="/posts">Trang Chủ</Link>
                    <Link className="nav-link" to="/categories">Chủ đề</Link>
                    <Link className="nav-link" to="/about">Về chúng tôi</Link>
                    <Link className="nav-link" to="/allPosts">Tất cả bài viết</Link>
                </nav>
                <span className="nav-link" onClick={toggleLogoutButton}>
                    <CgProfile className='profile-icon' /> {username}
                    {isClicked && (
                        <div className='user-container'>
                            <div className='user-basic-information'>
                                <img className='img-avatar' src={`http://localhost:3001/${avatar_url}`} alt='avatar' />
                                <div className='user-details'>
                                    <p className='user-name'>{username}</p>
                                    <p className='user-email'>{email}</p>
                                </div>
                            </div>
                            <Link className='user-profile' to={`/profile`}>
                                <CgProfile /> Your profile
                            </Link>
                            <Link className='user-posts' to={`/posts/user`}>
                                <BsPostcard /> Your posts
                            </Link>
                            <Button type="primary" onClick={showModal}>
                                Đăng xuất
                            </Button>
                        </div>
                    )}
                </span>

            </header>
        </>
    );
};

export default Header;