// Login.js
import React, { useState } from 'react';
import { loginUser, requestPasswordReset, resetPassword } from '../../api/api';
import { Button, Modal, Input, Form } from "antd";
import Cookies from 'js-cookie'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const ForgotPassword = ({ visible, onClose, onVerificationCodeReceived }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        setLoading(true);
        try {
            await requestPasswordReset(email);
            toast.success("Kiểm tra email của bạn để nhận mã xác nhận.");
            onVerificationCodeReceived(email); // Pass email to parent
            onClose();
        } catch (error) {
            toast.error(error.response ? error.response.data.message : "Có lỗi xảy ra. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Quên Mật Khẩu"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={400}
        >
            <Input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
                loading={loading}
                type="primary"
                onClick={handleForgotPassword}
                style={{ width: '100%', marginTop: '10px' }}
            >
                Gửi Yêu Cầu
            </Button>
        </Modal>
    );
};

const ResetPassword = ({ visible, onClose, email }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        setLoading(true);
        try {
            await resetPassword({ verificationCode, newPassword });
            toast.success("Mật khẩu đã được đặt lại thành công.");
            onClose();
        } catch (error) {
            toast.error(error.response ? error.response.data.message : "Có lỗi xảy ra. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Đặt Lại Mật Khẩu"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={400}
        >
            <Input
                placeholder="Mã xác nhận"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <Input.Password
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <Button
                loading={loading}
                type="primary"
                onClick={handleResetPassword}
                style={{ width: '100%' }}
            >
                Đặt lại mật khẩu
            </Button>
        </Modal>
    );
};

const Login = ({ visible, onClose, onLoginSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
    const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true);
        const { email, password } = values;

        try {
            const response = await loginUser({ email, password });
            const { token, username, user_id, avatar_url, role } = response.data;

            Cookies.set('username', username, { expires: 7 });
            Cookies.set('avatar_url', avatar_url, { expires: 7 });
            Cookies.set('token', token, { expires: 7 });
            Cookies.set('user_id', user_id, { expires: 7 });
            Cookies.set('role', role, { expires: 7 });

            onLoginSuccess({ username, avatar_url, email });
            toast.success(`Đăng nhập thành công! \n\n Chào mừng bạn, ${username}!`);

            if (role === "admin") {
                navigate('/admin/posts');
            }
            onClose();
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response ? error.response.data.message : "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                title="Đăng Nhập"
                visible={visible}
                onCancel={onClose}
                footer={null}
                width={400}
            >
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input
                            type="email"
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>
                    <Button
                        loading={loading}
                        htmlType='submit'
                        type="primary"
                        style={{ width: '100%' }}
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        type="link"
                        onClick={() => {
                            setForgotPasswordVisible(true);
                            setEmail('');
                        }}
                        style={{ marginTop: '10px', width: '100%' }}
                    >
                        Quên mật khẩu?
                    </Button>
                </Form>
            </Modal>

            <ForgotPassword 
                visible={forgotPasswordVisible} 
                onClose={() => setForgotPasswordVisible(false)} 
                onVerificationCodeReceived={(email) => {
                    setEmail(email);
                    setResetPasswordVisible(true);
                }} 
            />

            <ResetPassword 
                visible={resetPasswordVisible} 
                onClose={() => setResetPasswordVisible(false)} 
                email={email} 
            />
        </>
    );
};

export default Login;