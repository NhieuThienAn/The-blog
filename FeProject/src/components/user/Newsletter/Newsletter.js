import React, { useState } from 'react';
import { Form, Input, Button, notification, Typography, Row, Col } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { subscribeToNewsletter } from '../../../api/api'; // Adjust the import based on your file structure
import './Newsletter.scss';

const { Title, Text } = Typography;

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const onFinish = async () => {
        try {
            await subscribeToNewsletter(email);
            notification.success({
                message: 'Đăng ký thành công!',
                description: `Bạn đã đăng ký nhận bản tin với email: ${email}`,
            });
            setEmail('');
        } catch (error) {
            notification.error({
                message: 'Đăng ký thất bại!',
                description: error.response?.data?.error || 'Có lỗi xảy ra, vui lòng thử lại.',
            });
        }
    };

    const onFinishFailed = () => {
        notification.error({
            message: 'Đăng ký thất bại!',
            description: 'Vui lòng nhập địa chỉ email hợp lệ.',
        });
    };

    return (
        <div className="newsletter-container">
            <Row justify="center" align="middle" gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={2}>Đăng ký nhận bản tin</Title>
                    <Text>Nhận thông tin mới nhất và hấp dẫn từ chúng tôi!</Text>
                </Col>
                <Col span={19}>
                    <Form
                        name="newsletter"
                        layout="inline"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="Nhập email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '20vw' }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={24}>
                    <Text type="secondary" style={{ fontSize: '0.9em' }}>
                        Chúng tôi cam kết bảo mật thông tin của bạn và không bao giờ chia sẻ với bên thứ ba.
                    </Text>
                </Col>
            </Row>
        </div>
    );
};

export default Newsletter;