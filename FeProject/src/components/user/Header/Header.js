import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { PiPlanetFill } from "react-icons/pi";
import { ToastContainer } from 'react-toastify'; 
import { getUsersById } from '../../../api/api';
import { stopTokenRefresh } from '../../TokenService';
import { Button, Modal, message } from 'antd';
import Cookies from 'js-cookie';
import Login from '../../Login/Login'; 
import UserForm from '../Register/Register';
import { startTokenRefresh } from '../../TokenService';
import './Header.scss';

const Header = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [avatar_url, setAvatar_url] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false); 

    const user_id = Cookies.get('user_id');
    const role = Cookies.get('role');
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

    const handleRegisterModal = () => {
        setIsRegisterModalVisible(true);
    };

    const handleLoginModal = () => {
        setIsLoginModalVisible(true);
    };

    const handleCloseRegisterModal = () => {
        setIsRegisterModalVisible(false);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalVisible(false);
    };
    const handleLoginSuccess = (user) => {
        setUsername(user.username);
        setAvatar_url(user.avatar_url);
        setEmail(user.email);
        if(role === "admin") {
            navigate('/admin/posts');
        }
        startTokenRefresh();
    };
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await getUsersById(user_id);
                setAvatar_url(response.data.avatar_url);
                setUsername(response.data.username);
                setEmail(response.data.email);
            } catch (error) {
                console.error("Error fetching user:", error);
                setError("Failed to load user information.");
            } finally {
                setLoading(false);
            }
        };

        if (user_id) {
            fetchUser();
            const intervalComment = setInterval(fetchUser, 3000);
            return () => clearInterval(intervalComment);
        }
    }, [user_id]);

    const handleLogout = () => {
        Cookies.remove('username');
        Cookies.remove('user_id');
        Cookies.remove('email');
        Cookies.remove('avatar_url');
        Cookies.remove('token');
        Cookies.remove('role');
        stopTokenRefresh();
        navigate("/posts")
        window.location.reload();
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
                    <CgProfile className='profile-icon' /> {username || 'Đăng nhập'}
                    {isClicked && (
                        <>
                            {username ? (
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
                                    <Button type="primary" danger onClick={showModal}>
                                        Đăng xuất
                                    </Button>
                                </div>
                            ) : (
                                <div className='user-container-nonlog'>
                                    <Button className='user-login' onClick={handleLoginModal}>
                                        Đăng nhập
                                    </Button>
                                    <Button className='user-register' onClick={handleRegisterModal}>
                                        Đăng ký
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </span>
            </header>
            <UserForm visible={isRegisterModalVisible} onClose={handleCloseRegisterModal} />
            <Login visible={isLoginModalVisible} onClose={handleCloseLoginModal} onLoginSuccess={handleLoginSuccess} /> {/* Modal for login */}
            <ToastContainer /> {/* ToastContainer for toasts */}
        </>
    );
};

export default Header;