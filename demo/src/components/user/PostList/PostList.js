import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../../../api/api';
import Loading from '../Loading/Loading';
import Represent from '../Represent/Represent';
import './PostList.scss';

const PostList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getAllPosts();
        // Sort posts by likes in descending order
        const sortedPosts = response.data.sort((a, b) => b.likes - a.likes);
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Represent />
      <div className="post-list-container">
        {posts.length === 0 ? (
          <p className="no-posts-message">Không có bài viết nào để hiển thị.</p>
        ) : (
          <div className="post-layout">
            <div className="main-post">
              <img src={`http://localhost:3001/${posts[0].image_url}`} alt="Post Thumbnail" className="post-image" />
              <a href={`/posts/${posts[0]._id}`} className="post-title">{posts[0].title}</a>
              <p className="post-content">{posts[0].content.length > 50 ? `${posts[0].content.substring(0, 90)}...` : posts[0].content}</p>
            </div>
            <div className="sidebar-posts">
              <ul className="post-list">
                {posts.slice(1, 5).map(post => (
                  <li className="post-item" key={post._id}>
                    <img src={`http://localhost:3001/${post.image_url}`} alt="Post Thumbnail" className="post-image" />
                    <a href={`/posts/${post._id}`} className="post-title">{post.title}</a>
                    <p className="post-content">{post.content.length > 50 ? `${post.content.substring(0, 90)}...` : post.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostList;