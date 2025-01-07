import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, getCommentsByPostId, likePost, unlikePost, deleteComment, updateComment } from '../../../api/api';
import CommentForm from '../CommentForm/CommentForm';
import { Typography, Button, List, Avatar, Spin, Alert, Image, Modal, Input } from 'antd';
import './PostDetail.css';

const { Title, Paragraph } = Typography;

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const [editingComment, setEditingComment] = useState(null);
    const [newCommentContent, setNewCommentContent] = useState('');

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const postResponse = await getPostById(postId);
                setPost(postResponse.data);

                const userId = localStorage.getItem('userId');
                setLiked(postResponse.data.likedBy.includes(userId));

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

        const interval = setInterval(fetchComments, 1000);
        return () => clearInterval(interval);
    }, [postId]);

    const handleCommentAdded = (newComment) => {
        if (newComment && newComment.id) {
            setComments((prevComments) => [...prevComments, newComment]);
        } else {
            console.error("New comment is not valid:", newComment);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const token = localStorage.getItem('token');
        try {
            await deleteComment(commentId, token);
            setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleEditComment = async () => {
        const token = localStorage.getItem('token');
        try {
            const updatedComment = await updateComment(editingComment.id, newCommentContent, token);
            setComments((prevComments) =>
                prevComments.map(comment => (comment.id === updatedComment.id ? updatedComment : comment))
            );
            setEditingComment(null);
            setNewCommentContent('');
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const openEditModal = (comment) => {
        setEditingComment(comment);
        setNewCommentContent(comment.content);
    };

    const handleLike = async () => {
        const token = localStorage.getItem('token');
        try {
            const updatedPost = await likePost(postId, token);
            setPost(updatedPost);
            setLiked(true);
        } catch (error) {
            console.error('Error liking the post:', error);
        }
    };

    const handleUnlike = async () => {
        const token = localStorage.getItem('token');
        try {
            const updatedPost = await unlikePost(postId, token);
            setPost(updatedPost);
            setLiked(false);
        } catch (error) {
            console.error('Error unliking the post:', error);
        }
    };

    if (loading) return <Spin tip="Loading..." />;
    if (error) return <Alert message={error} type="error" />;

    if (!post) {
        return <Alert message="Post not found." type="warning" />;
    }

    return (
        <>
            <div className="post-detail-page">
                <Title className='post-detail-title' level={1}>{post.title}</Title>
                <div className="post-detail-content">
                    <div className="post-detail-text">
                        <Paragraph>{post.content}</Paragraph>
                        <Paragraph>
                            <strong>Tác giả:</strong> {post.user_id ? post.user_id.username : 'Unknown User'}
                        </Paragraph>
                        <Paragraph>
                            <strong>Số lượt like của bài viết:</strong> {post.likes || 0}
                        </Paragraph>
                        <Button
                            onClick={liked ? handleUnlike : handleLike}
                            type={liked ? 'default' : 'primary'}
                            className='like-button'
                        >
                            {liked ? 'Unlike' : `${post.likes} Like`}
                        </Button>
                    </div>
                    <Image className='post-detail-img' src={`http://localhost:3001/${post.image_url}`} alt={post.title + " Hình nền"} />
                </div>
            </div>
            <div className='comment-container'>
                {comments.length > 0 ? (
                    <>
                        <Title level={3}>Bình luận bài viết</Title>
                        <List
                            dataSource={comments}
                            renderItem={comment => {
                                if (!comment) return null;
                                const username = comment.user_id ? comment.user_id.username : 'Unknown User';
                                return (
                                    <List.Item key={comment.id}>
                                        <List.Item.Meta
                                            avatar={<Avatar>{username.charAt(0)}</Avatar>}
                                            title={username}
                                            description={comment.content}
                                        />
                                        <Button onClick={() => openEditModal(comment)} type="link">Edit</Button>
                                        <Button onClick={() => handleDeleteComment(comment.id)} type="link" danger>Delete</Button>
                                    </List.Item>
                                );
                            }}
                        />
                    </>
                ) : (
                    <Paragraph>No comments available for this post.</Paragraph>
                )}
            </div>
            <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
            <Modal
                title="Edit Comment"
                visible={!!editingComment}
                onOk={handleEditComment}
                onCancel={() => setEditingComment(null)}
            >
                <Input
                    value={newCommentContent}
                    onChange={(e) => setNewCommentContent(e.target.value)}
                />
            </Modal>
        </>
    );
};

export default PostDetail;