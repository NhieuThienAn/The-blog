<<<<<<< HEAD
import React, { useState } from 'react';
import { createComment } from '../../../api/api';
import './CommentForm.css'; // Import the CSS file
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toastify

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem postId có tồn tại hay không
    if (!postId) {
      toast.error('Không tìm thấy bài viết. Vui lòng thử lại.');
      return;
    }

    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    try {
      const newComment = await createComment({ post_id: postId, content }, token);
      setContent('');

      // Gọi callback để cập nhật danh sách bình luận trong component cha
      if (onCommentAdded) {
        onCommentAdded(newComment.data); // Truyền bình luận mới
      }

      // Hiển thị thông báo thành công
      toast.success('Bình luận đã được gửi thành công!');
    } catch (error) {
      // Hiển thị thông báo lỗi
      toast.error(error.response?.data?.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Kiểm tra phím Enter mà không có Shift
      handleSubmit(e);
      window.location.reload(); // Reload the page
    }
  };

  return (
    <>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          className="comment-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          required
          onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown
        />
        <button className="comment-button" type="submit">Submit Comment</button>
      </form>
      <ToastContainer />
    </>
  );
=======
// src/components/CommentForm/CommentForm.js

import React, { useState } from 'react';
import { createComment } from '../../../api/api';
import { Input, Button, notification } from 'antd';
import './CommentForm.css'; // Import the CSS file

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

            if (onCommentAdded) {
                onCommentAdded(newComment.data); // Update parent component
            }

            openNotification('success', 'Bình luận đã được gửi thành công!');
        } catch (error) {
            openNotification('error', error.response?.data?.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
            e.preventDefault(); // Prevent default behavior of Enter key
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
                onKeyDown={handleKeyDown} // Add key down event
            />
            <Button 
                type="primary" 
                htmlType="submit" 
                className="comment-button"
                style={{ marginTop: '10px' }} // Add margin for spacing
            >
                Submit Comment
            </Button>
        </form>
    );
>>>>>>> 086163e (74% done)
};

export default CommentForm;