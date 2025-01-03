<<<<<<< HEAD
=======
// src/components/PostDetail/PostDetail.js

>>>>>>> 086163e (74% done)
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, getCommentsByPostId, likePost, unlikePost } from '../../../api/api';
import CommentForm from '../CommentForm/CommentForm';
import Loading from '../Loading/Loading';
<<<<<<< HEAD
import './PostDetail.css';

=======
import { Typography, Button, List, Avatar, Spin, Alert, Image } from 'antd';
import './PostDetail.css';

const { Title, Paragraph } = Typography;

>>>>>>> 086163e (74% done)
const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const postResponse = await getPostById(postId);
                setPost(postResponse.data);
                const userId = localStorage.getItem('userId');
<<<<<<< HEAD
                // Check if the user has already liked the post
=======
>>>>>>> 086163e (74% done)
                setLiked(postResponse.data.likedBy.includes(userId));

                const commentsResponse = await getCommentsByPostId(postId);
                setComments(commentsResponse.data || []);
            } catch (postError) {
                console.error("Error fetching post:", postError);
                setError("Failed to load post. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    const handleCommentAdded = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    const handleLike = async () => {
        const token = localStorage.getItem('token');
        try {
            const updatedPost = await likePost(postId, token);
            setPost(updatedPost);
<<<<<<< HEAD
            setLiked(true); // Update liked state
=======
            setLiked(true);
>>>>>>> 086163e (74% done)
        } catch (error) {
            console.error('Error liking the post:', error);
        }
    };

    const handleUnlike = async () => {
        const token = localStorage.getItem('token');
        try {
            const updatedPost = await unlikePost(postId, token);
            setPost(updatedPost);
<<<<<<< HEAD
            setLiked(false); // Update liked state
=======
            setLiked(false);
>>>>>>> 086163e (74% done)
        } catch (error) {
            console.error('Error unliking the post:', error);
        }
    };

<<<<<<< HEAD
    if (loading) return <Loading />;
    if (error) return <div>{error}</div>;

    if (!post) {
        return <div>Post not found.</div>;
=======
    if (loading) return <Spin tip="Loading..." />;
    if (error) return <Alert message={error} type="error" />;

    if (!post) {
        return <Alert message="Post not found." type="warning" />;
>>>>>>> 086163e (74% done)
    }

    return (
        <>
<<<<<<< HEAD
            <h2 className='post-detail-title'>{post.title}</h2>
            <div className="post-detail-page">
                <div className="post-detail-content">
                    <div className="post-detail-text">
                        <p className='post-detail-content'>{post.content}</p>
                        <p className='post-detail-author'>
                            <strong>Tác giả:</strong> {post.user_id ? post.user_id.username : 'Unknown User'}
                        </p>
                        <p><strong>Số lượt like của bài viết:</strong> {post.likes || 0}</p>
                        <button onClick={liked ? handleUnlike : handleLike} className='like-button'>
                            {liked ? 'Unlike' : 'Like'}
                        </button>
                        <div className='comment-container'>
                            {comments.length > 0 ? (
                                <>
                                    <h3>Bình luận bài viết</h3>
                                    <ul>
                                        {comments.map((comment) => {
                                            const username = comment.user_id ? comment.user_id.username : 'Unknown User';
                                            return (
                                                <li key={comment.id}>
                                                    <strong>{username}:</strong> {comment.content}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </>
                            ) : (
                                <p>No comments available for this post.</p>
                            )}
                        </div>
                    </div>
                    <img className='post-detail-img' src={`http://localhost:3001/${post.image_url}`} alt="Background" />
                </div>
            </div>
=======
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
                            {liked ? 'Unlike' : 'Like'}
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
                                const username = comment.user_id ? comment.user_id.username : 'Unknown User';
                                return (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar>{username.charAt(0)}</Avatar>}
                                            title={username}
                                            description={comment.content}
                                        />
                                    </List.Item>
                                );
                            }}
                        />
                    </>
                ) : (
                    <Paragraph>No comments available for this post.</Paragraph>
                )}
            </div>
>>>>>>> 086163e (74% done)
            <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
        </>
    );
};

export default PostDetail;