import Sidebar from '../../admin/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost, deletePost } from '../../../api/api';
import { Modal, Input, Button, Select } from 'antd';
import { SnackbarProvider, useSnackbar } from 'notistack'; // Import SnackbarProvider và useSnackbar
import './PostDetail.scss';
import Loading from '../Loading/Loading';
import Cookies from 'js-cookie';

const PostDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [updatedSlug, setUpdatedSlug] = useState('');
    const [updatedImageUrl, setUpdatedImageUrl] = useState('');
    const [updatedStatus, setUpdatedStatus] = useState('draft');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPostById(postId);
                setPost(response.data);
                setUpdatedTitle(response.data.title);
                setUpdatedContent(response.data.content);
                setUpdatedSlug(response.data.slug);
                setUpdatedImageUrl(response.data.image_url);
                setUpdatedStatus(response.data.status);
            } catch (error) {
                console.error("Error fetching post:", error);
                setError("Failed to load post. Please try again later.");
            }
        };

        fetchPost();
    }, [postId]);

    const { enqueueSnackbar } = useSnackbar(); // Khai báo hàm enqueueSnackbar

    const handleOk = async () => {
        if (post) {
            const updatedPost = {
                title: updatedTitle.trim(),
                content: updatedContent.trim(),
                slug: updatedSlug.trim(),
                image_url: updatedImageUrl.trim(),
                status: updatedStatus.trim(),
            };

            try {
                const token = Cookies.get('token');
                await updatePost(postId, updatedPost, token);
                
                // Gọi lại API để lấy dữ liệu mới sau khi cập nhật
                const postResponse = await getPostById(postId);
                setPost(postResponse.data); // Cập nhật state với dữ liệu mới
                setIsModalVisible(false);
                setError(null);
                
                // Hiển thị thông báo thành công
                enqueueSnackbar('Cập nhật bài viết thành công!', { variant: 'success' }); // Thông báo thành công
            } catch (error) {
                console.error("Error updating post:", error);
                setError("Failed to update post. Please try again later.");
                enqueueSnackbar("Failed to update post. Please try again later.", { variant: 'error' }); // Thông báo lỗi
            }
        }
    };

    const handleDelete = async () => {
        try {
            await deletePost(postId, Cookies.get('token'));
            navigate('/admin/posts'); // Quay lại danh sách bài viết

            // Hiển thị thông báo thành công
            enqueueSnackbar('Xóa bài viết thành công!', { variant: 'success' }); // Thông báo thành công
        } catch (error) {
            console.error("Error deleting post:", error);
            setError("Failed to delete post. Please try again later.");
            enqueueSnackbar("Failed to delete post. Please try again later.", { variant: 'error' }); // Thông báo lỗi
        }
    };

    if (error) {
        return <p className="post-detail-error-message">{error}</p>;
    }

    if (!post) {
        return <Loading />;
    }

    return (
        <SnackbarProvider maxSnack={3}> {/* Thêm SnackbarProvider ở đây */}
            <div className="post-detail-container">
                <Sidebar />
                <p className="post-detail-author"><strong>Tác giả:</strong> {post.user_id?.username}</p>
                <h2 className="post-detail-title">{post.title}</h2>
                <p className="post-detail-content">{post.content}</p>
                <img className="post-detail-image" src={`http://localhost:3001/${post.image_url}`} alt="Post" />
                <p><strong>Số lượt thích:</strong> {post.likes}</p>
                <p><strong>Ngày đăng:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                <p><strong>Trạng thái:</strong> {post.status}</p>
                <div className="post-detail-buttons">
                    <Button className="post-detail-edit-button" onClick={() => setIsModalVisible(true)}>Chỉnh sửa</Button>
                    <Button className="post-detail-delete-button" onClick={() => setIsDeleteModalVisible(true)}>Xóa</Button>
                </div>

                <Modal
                    title="Chỉnh sửa Bài viết"
                    open={isModalVisible}
                    onOk={handleOk}
                    centered
                    onCancel={() => setIsModalVisible(false)}
                    className="post-detail-edit-modal"
                >
                    <h4>Tiêu đề bài viết</h4>
                    <Input
                        className="post-detail-modal-input"
                        placeholder="Tiêu đề bài viết"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />

                    <h4>Nội dung bài viết</h4>
                    <Input.TextArea
                        className="post-detail-modal-input"
                        rows={4}
                        placeholder="Nội dung bài viết"
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                    />

                    <h4>Slug bài viết</h4>
                    <Input
                        className="post-detail-modal-input"
                        placeholder="Slug bài viết"
                        value={updatedSlug}
                        onChange={(e) => setUpdatedSlug(e.target.value)}
                    />

                    <h4>URL hình ảnh</h4>
                    <Input
                        className="post-detail-modal-input"
                        placeholder="URL hình ảnh"
                        value={updatedImageUrl}
                        onChange={(e) => setUpdatedImageUrl(e.target.value)}
                    />

                    <h4>Trạng thái</h4>
                    <Select
                        className="post-detail-modal-input"
                        placeholder="Chọn trạng thái"
                        value={updatedStatus}
                        onChange={(value) => setUpdatedStatus(value)}
                    >
                        <Select.Option value="draft">Draft</Select.Option>
                        <Select.Option value="published">Published</Select.Option>
                    </Select>
                </Modal>

                <Modal
                    title="Xóa Bài viết"
                    open={isDeleteModalVisible}
                    onOk={handleDelete}
                    onCancel={() => setIsDeleteModalVisible(false)}
                    className="post-detail-delete-modal"
                >
                    <p className="post-detail-delete-confirmation">Bạn có chắc chắn muốn xóa bài viết này?</p>
                </Modal>
            </div>
        </SnackbarProvider>
    );
};

export default PostDetail;