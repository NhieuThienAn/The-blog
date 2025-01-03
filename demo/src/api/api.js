import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// User API
export const createUser = (userData) => axios.post(`${API_URL}/register`, userData);
export const loginUser = (loginData) => axios.post(`${API_URL}/login`, loginData);
export const getUsersById = (userId) => axios.get(`${API_URL}/users/${userId}`);
export const getTopUsersByLikes = () => axios.get(`${API_URL}/users/top-likes`);
export const getAllUsers = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateUser = (userId, userData, token) =>
  axios.put(`${API_URL}/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const lockUser = (userId, token) => {
  return axios.patch(`${API_URL}/users/${userId}/lock`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unlockUser = (userId, token) => {
  return axios.patch(`${API_URL}/users/${userId}/unlock`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Password Reset API
export const requestPasswordReset = (email) => {
  return axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = async ({ verificationCode, newPassword }) => {
  return await axios.post('http://localhost:3001/api/reset', {
      verificationCode,
      newPassword
  });
};

// api.js
// Post API
export const createPost = async (postData, token) => {
  const response = await axios.post(`${API_URL}/posts`, postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};
export const likePost = async (postId, token) => {
  const response = await axios.post(`${API_URL}/posts/${postId}/like`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const unlikePost = async (postId, token) => {
  const response = await axios.post(`${API_URL}/posts/${postId}/unlike`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getPostById = (postId) => axios.get(`${API_URL}/posts/${postId}`);
export const getPostsByUserId = (userId) => axios.get(`${API_URL}/posts/user/${userId}`);
export const getAllPosts = () => axios.get(`${API_URL}/posts`);
export const getAllPostsForAdmin = (token) => {
  return axios.get(`${API_URL}/admin/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getPostsBySearch = (searchTerm) => axios.get(`${API_URL}/posts/search?query=${encodeURIComponent(searchTerm)}`);
export const updatePost = async (postId, updatedPost, token) => {

  try {
    const response = await axios.put(`${API_URL}/posts/${postId}`, updatedPost, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Nếu gửi dưới dạng JSON
      },
    });
    console.log("API data", response.data); //
    return response.data; // Đảm bảo return nằm trong hàm
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
export const getPostsByCategory = (categoryId) => {
  return axios.get(`${API_URL}/posts/category/${categoryId}`);
};
export const deletePost = (postId, token) => {
  return axios.delete(`${API_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Comment API
export const createComment = async ({ post_id, content }, token) => {
  const response = await axios.post(`${API_URL}/comments`, { post_id, content }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getCommentsByPostId = (postId) => axios.get(`${API_URL}/posts/${postId}/comments`);

// Category API
export const createCategory = (categoryData) => axios.post(`${API_URL}/categories`, categoryData);
export const getAllCategories = () => axios.get(`${API_URL}/categories`);
export const deleteCategory = (categoryId) => {
  const token = localStorage.getItem('token');
  return axios.delete(`${API_URL}/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Tag API
export const createTag = (tagData) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}/tags`, tagData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getAllTags = () => axios.get(`${API_URL}/tags`);
export const deleteTag = (tagId) => {
  const token = localStorage.getItem('token');
  return axios.delete(`${API_URL}/tags/${tagId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};