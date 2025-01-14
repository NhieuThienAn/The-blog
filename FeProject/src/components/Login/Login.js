import React, { useState } from 'react';
import { loginUser, requestPasswordReset, resetPassword } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Modal, Input, Form } from "antd";
import { startTokenRefresh } from '../TokenService';
import Cookies from 'js-cookie'; 
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

const Login = ({ visible, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true);
        const { email, password } = values;

        try {
            const response = await loginUser({ email, password });
            const { token, username, user_id, role, avatar_url } = response.data;
            console.log("Login Response:", response.data);
            // Lưu trữ thông tin người dùng trong cookies
            Cookies.set('username', username, { expires: 7 });
            Cookies.set('avatar_url', avatar_url, { expires: 7 });
            Cookies.set('token', token, { expires: 7 });
            Cookies.set('user_id', user_id, { expires: 7 });
            Cookies.set('role', role, { expires: 7 });

            startTokenRefresh();
            setTimeout(() => {
                if (role === 'admin') {
                    navigate('/admin/posts');
                } else {
                    navigate('/posts');
                }
            }, 100);
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response ? error.response.data.message : "Đã xảy ra lỗi, vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        try {
            await requestPasswordReset(email);
            toast.success('Mã xác nhận đã được gửi đến email của bạn.');
        } catch (error) {
            toast.error(error.response ? error.response.data.message : "Đã xảy ra lỗi, vui lòng thử lại sau.");
        }
    };

    const handleResetPassword = async () => {
        if (!verificationCode || !newPassword) {
            toast.error('Vui lòng điền đầy đủ mã xác nhận và mật khẩu mới.');
            return;
        }

        try {
            await resetPassword({ verificationCode, newPassword });
            toast.success('Mật khẩu đã được đặt lại thành công.');
            setShowForgotPassword(false);
        } catch (error) {
            toast.error(error.response ? error.response.data.message : "Đã xảy ra lỗi, vui lòng thử lại sau.");
        }
    };

    return (
        <Modal
            title="Đăng Nhập"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={400}
        >
            <ToastContainer />
            <div className="login-form">
                <h2 className="login-title">Đăng nhập</h2>
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Button type="link" onClick={() => setShowForgotPassword(true)}>
                        Quên mật khẩu?
                    </Button>
                    <Button
                        loading={loading}
                        htmlType='submit'
                        type="primary"
                        style={{ width: '100%' }}
                        onClick={onClose}
                    >
                        Đăng nhập
                    </Button>
                </Form>
                <a className='login-toregister' onClick={onClose}>
                    Bạn chưa có tài khoản? Đăng ký
                </a>
            </div>

            <Modal
                title="Quên Mật Khẩu"
                open={showForgotPassword}
                onCancel={() => setShowForgotPassword(false)}
                footer={null}
            >
                <Form onFinish={handleForgotPassword}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input
                            type="text"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{ width: '100%' }} onClick={handleForgotPassword}>
                            Gửi mã xác nhận
                        </Button>
                    </Form.Item>

                    <Form.Item
                        name="verificationCode"
                        rules={[{ required: true, message: 'Vui lòng nhập mã xác nhận!' }]}
                    >
                        <Input
                            type="text"
                            placeholder="Nhập mã xác nhận"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{ width: '100%' }} onClick={handleResetPassword}>
                            Đặt lại mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Modal>
    );
};

export default Login;