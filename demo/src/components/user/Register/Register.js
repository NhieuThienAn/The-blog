import React, { useState } from 'react';
import { createUser } from '../../../api/api';
<<<<<<< HEAD
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
=======
import { Form, Input, Button, Upload, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.scss';

const { Title, Text } = Typography;
>>>>>>> 086163e (74% done)

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const [avatar, setAvatar] = useState(null); // Thay đổi state để lưu tệp hình ảnh
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        const response = await createUser(formData); // Hàm này nên sử dụng axios để gửi yêu cầu
        console.log(response.data);
        navigate('/login');
        toast.success("Đăng ký thành công!");
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(error.response.data);
            toast.error(error.response.data.error || "Đã xảy ra lỗi, vui lòng thử lại.");
        } else {
            console.error(error);
            toast.error("Đã xảy ra lỗi không xác định.");
        }
    }
};

  const handleRegisterClick = () => {
    navigate('/login'); // Chuyển hướng đến trang đăng nhập
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file); // Lưu tệp hình ảnh vào state
    }
=======
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('email', values.email);
      formData.append('password', values.password);
      if (avatar) {
        formData.append('avatar', avatar);
      }

      const response = await createUser(formData);
      console.log(response.data);
      navigate('/login');
      toast.success("Đăng ký thành công!");
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(error.response.data);
        toast.error(error.response.data.error || "Đã xảy ra lỗi, vui lòng thử lại.");
      } else {
        console.error(error);
        toast.error("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  const handleRegisterClick = () => {
    navigate('/login');
  };

  const handleFileChange = (file) => {
    setAvatar(file); // Lưu tệp hình ảnh vào state
    return false; // Ngăn chặn tự động upload
>>>>>>> 086163e (74% done)
  };

  return (
    <div className='register-page'>
      <div className="register-form">
<<<<<<< HEAD
        <div className="register-title">Đăng ký</div>
        <div className="register-welcome">Chào mừng bạn đến với website bài viết
          <br />
          Nơi chia sẻ các trải nghiệm của bạn cho mọi người
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="register-input"
          />
          <a className='register-toregister' href="#" onClick={handleRegisterClick}>Bạn đã có tài khoản?</a>
          <button id='submit-btn' type="submit">Đăng ký</button>
        </form>
=======
        <Title level={2} className="register-title">Đăng ký</Title>
        <Text className="register-welcome">
          Chào mừng bạn đến với website bài viết
          <br />
          Nơi chia sẻ các trải nghiệm của bạn cho mọi người
        </Text>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
          >
            <Input
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
          <Form.Item>
            <Upload
              beforeUpload={handleFileChange}
              accept="image/*"
              showUploadList={false}
            >
              <Button>Chọn hình đại diện</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <a className='register-toregister' onClick={handleRegisterClick}>Bạn đã có tài khoản?</a>
>>>>>>> 086163e (74% done)
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserForm;