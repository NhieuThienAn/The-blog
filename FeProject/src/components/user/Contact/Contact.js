import React from 'react';
import { Layout, Typography, Form, Input, Button, Space, message } from 'antd';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Contact = () => {
    const onFinish = async (values) => {
        try {
            const response = await fetch('http://localhost:3001/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi sớm nhất có thể.');
            } else {
                message.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
        }
    };

    return (
        <Layout style={{ padding: '20px' }}>
            <Content style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Title level={2}>Liên hệ với chúng tôi</Title>

                <Paragraph>
                    Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng điền vào biểu mẫu dưới đây và chúng tôi sẽ phản hồi bạn sớm nhất có thể.
                </Paragraph>

                <Form
                    name="contact"
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ marginTop: '20px' }}
                >
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn!' }]}
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                    >
                        <Input placeholder="Nhập số điện thoại (tùy chọn)" />
                    </Form.Item>

                    <Form.Item
                        label="Tin nhắn"
                        name="message"
                        rules={[{ required: true, message: 'Vui lòng nhập tin nhắn của bạn!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Nhập tin nhắn" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Gửi
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default Contact;