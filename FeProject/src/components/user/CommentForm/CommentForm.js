import React, { useState } from 'react';
import { createComment } from '../../../api/api';
import { Input, Button, notification, Card, Form } from 'antd';
import Cookies from 'js-cookie'; 

const { TextArea } = Input;

const CommentForm = ({ postId, onCommentAdded }) => {
    const [content, setContent] = useState('');

    const openNotification = (type, message) => {
        notification[type]({
            message: message,
            placement: 'topRight',
            duration: 3,
        });
    };

    const handleSubmit = async (values) => {
        if (!postId) {
            openNotification('error', 'Không tìm thấy bài viết. Vui lòng thử lại.');
            return;
        }

        const token = Cookies.get('token'); 
        try {
            const newComment = await createComment({ post_id: postId, content: values.content }, token);
            setContent('');

    
            if (onCommentAdded) {
                onCommentAdded(newComment.data);
            }

            openNotification('success', 'Bình luận đã được gửi thành công!');
        } catch (error) {
            openNotification('error', error.response?.data?.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
        }
    };

    return (
        <Card style={{ marginBottom: '20px' }} title="Thêm bình luận">
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="content"
                    rules={[{ required: true, message: 'Vui lòng nhập bình luận của bạn!' }]}
                >
                    <TextArea
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Viết bình luận..."
                        onKeyDown={handleKeyDown}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        Gửi bình luận
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CommentForm;