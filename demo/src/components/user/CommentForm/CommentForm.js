import React, { useState } from 'react';
import { createComment } from '../../../api/api';
import { Input, Button, notification } from 'antd';
import './CommentForm.css';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!postId) {
            openNotification('error', 'Không tìm thấy bài viết. Vui lòng thử lại.');
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const newComment = await createComment({ post_id: postId, content }, token);
            setContent('');

            // Gọi hàm để cập nhật bình luận mới
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
            handleSubmit(e);
            e.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
        }
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <TextArea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment..."
                required
                onKeyDown={handleKeyDown}
            />
            <Button
                type="primary"
                htmlType="submit"
                className="comment-button"
                style={{ marginTop: '10px' }}
            >
                Submit Comment
            </Button>
        </form>
    );
};

export default CommentForm;