import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getPostById,
    getCommentsByPostId,
    likePost,
    unlikePost,
    hasUserLikedPost,
    deleteComment,
} from '../../../api/api';
import CommentForm from '../CommentForm/CommentForm';
import {
    Typography,
    Button,
    List,
    Avatar,
    Spin,
    Alert,
    Image,
    Modal,
    Row,
    Col,
    Card,
} from 'antd';
import { FaFacebook, FaTwitter, FaPinterest, FaReddit } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; 
import Cookies from 'js-cookie';

import './PostDetail.scss';

const { Title, Paragraph } = Typography;

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const [isShareModalVisible, setShareModalVisible] = useState(false);
    
    const userId = Cookies.get('user_id');

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const postResponse = await getPostById(postId);
                setPost(postResponse.data);
                
                const token = Cookies.get('token');
                const likeResponse = await hasUserLikedPost(postId, token);
                setLiked(likeResponse.hasLiked);

                await fetchComments();
            } catch (postError) {
                console.error("Error fetching post:", postError);
                setError("Failed to load post. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const commentsResponse = await getCommentsByPostId(postId);
                setComments(commentsResponse.data || []);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchPostAndComments();
        const intervalComment = setInterval(fetchPostAndComments, 1000);
        return () => clearInterval(intervalComment);
    }, [postId]);

    const handleCommentAdded = (newComment) => {
        if (newComment && newComment.id) {
            setComments((prevComments) => [...prevComments, newComment]);
        } else {
            console.error("New comment is not valid:", newComment);
        }
    };

    const handleDeleteComment = (commentId,content) => {
        const confirmDelete = () => {
            const token = Cookies.get('token');
            deleteComment(commentId, token)
                .then(() => {
                    setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
                    toast.success("Bình luận đã được xóa thành công.");
                })
                .catch((error) => {
                    console.error("Error deleting comment:", error);
                    toast.error("Có lỗi xảy ra khi xóa bình luận.");
                });
        };

        Modal.confirm({
            title: 'Bạn có muốn xóa bình luận này ',
            content: content,
            onOk: confirmDelete,
            onCancel() {
                console.log('Xóa bình luận bị hủy.');
            },
        });
    };

    const handleLike = async () => {
        const token = Cookies.get('token');
        try {
            await likePost(postId, token);
            setLiked(true);
            setPost(prevPost => ({ ...prevPost, likes: prevPost.likes + 1 }));
        } catch (error) {
            console.error('Error liking the post:', error);
        }
    };

    const handleUnlike = async () => {
        const token = Cookies.get('token');
        try {
            await unlikePost(postId, token);
            setLiked(false);
            setPost(prevPost => ({ ...prevPost, likes: prevPost.likes - 1 }));
        } catch (error) {
            console.error('Error unliking the post:', error);
        }
    };

    const exportToWord = () => {
        const content = `
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>${post.title}</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        h1 { color: #333; }
                        p { margin: 10px 0; }
                        strong { font-weight: bold; }
                        img { max-width: 100%; height: auto; }
                    </style>
                </head>
                <body>
                    <h1>${post.title}</h1>
                    <img src="http://localhost:3001/${post.image_url}" alt="${post.title}" />
                    <p>${post.content}</p>
                    <p><strong>Tác giả:</strong> ${post.user_id ? post.user_id.username : 'Unknown User'}</p>
                    <p><strong>Số lượt like của bài viết:</strong> ${post.likes || 0}</p>
                </body>
            </html>
        `;
        const blob = new Blob([content], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${post.title}.doc`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const showShareModal = () => {
        setShareModalVisible(true);
    };

    const handleShare = (platform) => {
        const url = `http://localhost:3001/posts/${postId}`;
        const shareText = `Check out this post: ${post.title}`;

        let shareUrl = '';
        if (platform === 'facebook') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        } else if (platform === 'twitter') {
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
        } else if (platform === 'instagram') {
            alert("Chia sẻ qua Instagram không hỗ trợ trực tiếp. Hãy sao chép đường link để chia sẻ!");
            return;
        } else if (platform === 'linkedin') {
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        } else if (platform === 'pinterest') {
            shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(`http://localhost:3001/${post.image_url}`)}&description=${encodeURIComponent(shareText)}`;
        } else if (platform === 'reddit') {
            shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(shareText)}`;
        }

        window.open(shareUrl, '_blank');
        setShareModalVisible(false);
    };

    if (loading) return <Spin style={{ width: "97vw", padding: "31vh", marginBottom: "100vh" }} size='large' tip="Loading..." />;
    if (error) return <Alert message={error} type="error" />;
    if (!post) return <Alert message="Post not found." type="warning" />;

    return (
        <div style={{ padding: '20px' }}>
            <Card bordered={false} style={{ marginBottom: '20px' }}>
                <Title level={1}>{post.title}</Title>
                <div className='post-detail-content'>
                    <div className='post-detail-img'>
                        <Image style={{ width: "35vw" }} src={`http://localhost:3001/${post.image_url}`} alt={post.title} />
                    </div>

                    <Paragraph className='post-detail-text'>{post.content}</Paragraph>
                </div>
                <Paragraph>
                    <strong>Tác giả:</strong> {post.user_id ? post.user_id.username : 'Unknown User'}
                </Paragraph>
                <Paragraph>
                    <strong>Số lượt like:</strong> {post.likes || 0}
                </Paragraph>
                <Paragraph>
                    <strong>Danh mục:</strong> {post.category_id ? post.category_id.name : 'Chưa có danh mục'}
                </Paragraph>
                <Button
                    onClick={liked ? handleUnlike : handleLike}
                    type={liked ? 'default' : 'primary'}
                    style={{ marginRight: '10px' }}
                >
                    {liked ? 'Unlike' : `${post.likes} Like`}
                </Button>
                <Button onClick={exportToWord} type="primary" style={{ marginRight: '10px' }}>
                    Xuất thành Word
                </Button>
                <Button onClick={showShareModal} type="default">
                    Chia sẻ
                </Button>
            </Card>
            <Row>
                <Col span={24}>
                    <Title level={3}>Bình luận</Title>
                    <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
                    {comments.length > 0 ? (
                        <List
                            dataSource={comments}
                            renderItem={comment => {
                                if (!comment) return null;
                                const username = comment.user_id ? comment.user_id.username : 'Unknown User';
                                const isUserComment = comment.user_id && comment.user_id._id === userId;
                                return (
                                    <List.Item key={comment._id}>
                                        <List.Item.Meta
                                            avatar={<Avatar>{username.charAt(0)}</Avatar>}
                                            title={username}
                                            description={comment.content}
                                        />
                                        {isUserComment && ( 
                                            <Button onClick={() => handleDeleteComment(comment._id,comment.content)} type="link" danger>Delete</Button>
                                        )}
                                    </List.Item>
                                );
                            }}
                        />
                    ) : (
                        <Paragraph>No comments available for this post.</Paragraph>
                    )}
                </Col>
            </Row>
            <Modal
                title="Chia sẻ bài viết"
                visible={isShareModalVisible}
                onCancel={() => setShareModalVisible(false)}
                footer={null}
            >
                <Button onClick={() => handleShare('facebook')} type="primary" style={{ margin: '5px' }} icon={<FaFacebook />}>
                    Chia sẻ qua Facebook
                </Button>
                <Button onClick={() => handleShare('twitter')} type="primary" style={{ margin: '5px' }} icon={<FaTwitter />}>
                    Chia sẻ qua Twitter
                </Button>
                <Button onClick={() => handleShare('pinterest')} type="primary" style={{ margin: '5px' }} icon={<FaPinterest />}>
                    Chia sẻ qua Pinterest
                </Button>
                <Button onClick={() => handleShare('reddit')} type="primary" style={{ margin: '5px' }} icon={<FaReddit />}>
                    Chia sẻ qua Reddit
                </Button>
            </Modal>
            <ToastContainer /> {/* Include ToastContainer for notifications */}
        </div>
    );
};

export default PostDetail;