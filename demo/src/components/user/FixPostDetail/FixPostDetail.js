import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost, deletePost } from '../../../api/api';
import { Typography, Input, Button, Spin, Alert, Upload, Card, Image, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'; // Import thư viện js-cookie

import './FixPostDetail.scss';

const { Title, Paragraph } = Typography;

const FixPostDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatedContent, setUpdatedContent] = useState('');
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPostById(postId);
                setPost(response.data);
                setUpdatedContent(response.data.content);
                setUpdatedTitle(response.data.title);
            } catch (postError) {
                console.error("Error fetching post:", postError);
                setError("Failed to load post. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    const handleUpdatePost = async () => {
        const token = Cookies.get('token');
        const formData = new FormData();
        formData.append('title', updatedTitle);
        formData.append('content', updatedContent);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await updatePost(postId, formData, token);
            message.success("Bài viết đã được cập nhật thành công!");
            navigate("/profile");
        } catch (updateError) {
            console.error("Error updating post:", updateError);
            message.error("Failed to update post. Please try again later.");
        }
    };

    const handleDeletePost = async () => {
        const token = Cookies.get('token');
        Modal.confirm({
            title: 'Xóa bài viết',
            content: 'Bạn có chắc chắn muốn xóa bài viết này?',
            onOk: async () => {
                try {
                    await deletePost(postId, token);
                    message.success("Bài viết đã được xóa thành công!");
                    navigate('/profile');
                } catch (deleteError) {
                    console.error("Error deleting post:", deleteError);
                    message.error("Failed to delete post. Please try again later.");
                }
            },
        });
    };

    const handleImageChange = (info) => {
        if (info.file.status === 'done') {
            setImageFile(info.file.originFileObj);
        }
    };

    const handleDeleteImage = () => {
        setImageFile(null); // Xóa hình ảnh khỏi trạng thái
    };

    if (loading) return <Spin tip="Loading..." />;
    if (error) return <Alert message={error} type="error" />;

    if (!post) {
        return <Alert message="Post not found." type="warning" />;
    }

    return (
        <Card title="Chỉnh sửa bài viết" style={{ width: '100%', margin: '20px auto' }}>
            <Title level={4}>Tiêu đề bài viết</Title>
            <Input
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                placeholder="Nhập tiêu đề bài viết"
                style={{ marginBottom: '16px' }}
            />
            <Title level={4}>Nội dung bài viết</Title>
            <Input.TextArea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                placeholder="Nhập nội dung bài viết"
                rows={13}
                style={{ marginBottom: '16px' }}
            />
            <Title level={4}>Hình ảnh</Title>
            <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleImageChange}
                style={{ marginBottom: '16px' }}
            >
                <Button icon={<UploadOutlined />} type="dashed" style={{ width: '100%' }}>
                    Tải lên hình ảnh
                </Button>
            </Upload>
            {post.image_url && (
                <div className="current-image" style={{ marginBottom: '16px' }}>
                    <Image src={`http://localhost:3001/${post.image_url}`} alt="Current Post" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                    <Paragraph type="secondary">Hình ảnh hiện tại</Paragraph>
                    <Button type="default" onClick={handleDeleteImage} style={{ marginTop: '8px' }}>
                        Xóa hình ảnh
                    </Button>
                </div>
            )}
            <Button type="primary" onClick={handleUpdatePost} style={{ marginTop: '16px' }}>
                Cập nhật bài viết
            </Button>
            <Button type="danger" onClick={handleDeletePost} style={{ marginTop: '16px', marginLeft: '8px' }}>
                Xóa bài viết
            </Button>
        </Card>
    );
};

export default FixPostDetail;