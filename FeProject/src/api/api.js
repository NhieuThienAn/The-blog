import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3001/api';

const getAuthHeaders = () => {
  const token = Cookies.get('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Refresh token
export const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/refresh-token`, { token: Cookies.get('token') });
    const newToken = response.data.token;
    Cookies.set('token', newToken); 
    return newToken; 
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error; 
  }
};

// User API
export const createUser = (userData) => axios.post(`${API_URL}/register`, userData);
export const loginUser = (loginData) => axios.post(`${API_URL}/login`, loginData);
export const getUsersById = (userId) => axios.get(`${API_URL}/users/${userId}`);
export const getTopUsersByLikes = () => axios.get(`${API_URL}/users/top-likes`);
export const getAllUsers = () => axios.get(`${API_URL}/users`, { headers: getAuthHeaders() });
export const updateUser = (userId, userData) => axios.put(`${API_URL}/users/${userId}`, userData, { headers: getAuthHeaders() });
export const lockUser = (userId) => axios.patch(`${API_URL}/users/${userId}/lock`, null, { headers: getAuthHeaders() });
export const unlockUser = (userId) => axios.patch(`${API_URL}/users/${userId}/unlock`, null, { headers: getAuthHeaders() });

// Check if user has liked a post
export const hasUserLikedPost = async (postId) => {
  const response = await axios.get(`${API_URL}/posts/${postId}/has-liked`, { headers: getAuthHeaders() });
  return response.data;
};

// Password Reset API
export const requestPasswordReset = (email) => axios.post(`${API_URL}/forgot-password`, { email });
export const resetPassword = async ({ verificationCode, newPassword }) => {
  return await axios.post(`${API_URL}/reset`, { verificationCode, newPassword });
};

// Post API
export const createPost = async (postData) => {
  const response = await axios.post(`${API_URL}/posts`, postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeaders(),
    },
  });
  return response.data;
};

export const likePost = async (postId) => {
  const response = await axios.post(`${API_URL}/posts/${postId}/like`, null, { headers: getAuthHeaders() });
  return response.data;
};

export const unlikePost = async (postId) => {
  const response = await axios.post(`${API_URL}/posts/${postId}/unlike`, null, { headers: getAuthHeaders() });
  return response.data;
};

export const getPostById = (postId) => axios.get(`${API_URL}/posts/${postId}`);
export const getPostsByUserId = (userId) => axios.get(`${API_URL}/posts/user/${userId}`);
export const getAllPosts = () => axios.get(`${API_URL}/posts`);
export const getAllPostsForAdmin = () => axios.get(`${API_URL}/admin/posts`, { headers: getAuthHeaders() });
export const getPostsBySearch = (searchTerm) => axios.get(`${API_URL}/posts/search?query=${encodeURIComponent(searchTerm)}`);
export const updatePost = async (postId, updatedPost) => {
  const response = await axios.put(`${API_URL}/posts/${postId}`, updatedPost, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.data;
};
export const updatePostForAdmin = async (postId, updatedPost) => {
  const response = await axios.put(`${API_URL}/posts/admin/${postId}`, updatedPost, { headers: getAuthHeaders() });
  return response.data;
};
export const getPostsByCategory = (categoryId) => axios.get(`${API_URL}/posts/category/${categoryId}`);
export const deletePost = (postId) => axios.delete(`${API_URL}/posts/${postId}`, { headers: getAuthHeaders() });

// Comment API
export const createComment = async ({ post_id, content }) => {
  const response = await axios.post(`${API_URL}/comments`, { post_id, content }, { headers: getAuthHeaders() });
  return response.data;
};

export const getCommentsByPostId = (postId) => axios.get(`${API_URL}/posts/${postId}/comments`);

// Delete a comment
export const deleteComment = async (commentId) => {
  const response = await axios.delete(`${API_URL}/comments/${commentId}`, { headers: getAuthHeaders() });
  return response.data;
};

// Update a comment
export const updateComment = async (commentId, updatedContent) => {
  const response = await axios.put(`${API_URL}/comments/${commentId}`, { content: updatedContent }, { headers: getAuthHeaders() });
  return response.data;
};

// Category API
export const createCategory = (categoryData) => axios.post(`${API_URL}/categories`, categoryData, { headers: getAuthHeaders() });
export const getAllCategories = () => axios.get(`${API_URL}/categories`);
export const deleteCategory = (categoryId) => axios.delete(`${API_URL}/categories/${categoryId}`, { headers: getAuthHeaders() });
export const updateCategory = async (categoryId, updatedData) => {
  const response = await axios.put(`${API_URL}/categories/${categoryId}`, updatedData, { headers: getAuthHeaders() });
  return response.data;
};

// Tag API
export const createTag = (tagData) => axios.post(`${API_URL}/tags`, tagData, { headers: getAuthHeaders() });
export const getAllTags = () => axios.get(`${API_URL}/tags`);
export const deleteTag = (tagId) => axios.delete(`${API_URL}/tags/${tagId}`, { headers: getAuthHeaders() });
export const updateTag = async (tagId, updatedData) => {
  const response = await axios.put(`${API_URL}/tags/${tagId}`, updatedData, { headers: getAuthHeaders() });
  return response.data;
};

// Subscribe for new posts
export const subscribeToNewsletter = (email) => axios.post(`${API_URL}/subscribe`, { email });

// Statistics for posts
export const getPostStatistics = async () => {
  const response = await axios.get(`${API_URL}/admin/post-statistics`, { headers: getAuthHeaders() });
  return response.data;
};

// Statistics for user
export const getUserStatistics = async () => {
  const response = await axios.get(`${API_URL}/admin/user-statistics`, { headers: getAuthHeaders() });
  return response.data;
};

// Get top users by posts
export const getTopUsersByPosts = () => axios.get(`${API_URL}/top-users-by-posts`);