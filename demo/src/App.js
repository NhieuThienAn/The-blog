import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';

<<<<<<< HEAD
// Import các trang admin
import Categories from './pages/admin/CategoriesManagement';
import PManagement from './pages/admin/PostManagement';
import UManagement from './pages/admin/UserManagement';
import CManagement from './pages/admin/CategoriesManagement';
import TManagement from './pages/admin/TagManagement';
import AdminPostDetail from './components/admin/PostManagement/PostDetail';

// Import các trang user
import Posts from './pages/user/Posts';
=======
// Import Admin Pages
import CategoriesManagement from './pages/admin/CategoriesManagement';
import PostManagement from './pages/admin/PostManagement';
import UserManagement from './pages/admin/UserManagement';
import TagManagement from './pages/admin/TagManagement';
import AdminPostDetail from './components/admin/PostManagement/PostDetail';

// Import User Pages
import Posts from './pages/user/PostsList';
>>>>>>> 086163e (74% done)
import Loading from './pages/user/Loading';
import Profile from './pages/user/Profile';
import Register from './pages/user/Register';
import PostDetail from './pages/user/PostDetail';
import AboutTheWebSite from './pages/user/About';
import ThemeFilter from './pages/user/ThemeFilter';
import AllPostPage from './pages/user/AllPost';
<<<<<<< HEAD
// Import trang chung
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
=======
import UPostDetail from './pages/user/UPostDetail';
import Privacy from './pages/user/Privacy';
import UTermsOfService from './pages/user/Term';
import FrequentlyAskedQuestions from './pages/user/FAQ';
import ContactUs from './pages/user/Contact';
// Import Common Pages
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
>>>>>>> 086163e (74% done)

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
<<<<<<< HEAD
  }, []);
=======
  },[]);
>>>>>>> 086163e (74% done)

  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        {/* User Routes*/}
=======
        {/* User Routes */}
>>>>>>> 086163e (74% done)
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
<<<<<<< HEAD
        <Route path="/loading" element={<Loading />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutTheWebSite />} />
        <Route path="/categories" element={<ThemeFilter />} />
        <Route path="/allPosts" element={<AllPostPage />}  />

        {/* Admin Routes */}
        <Route path="/admin/posts" element={<ProtectedRoute element={<PManagement />} allowedRoles={['admin']} />} />
        <Route path="/admin/users" element={<ProtectedRoute element={<UManagement />} allowedRoles={['admin']} />} />
        <Route path="/admin/categories" element={<ProtectedRoute element={<CManagement />} allowedRoles={['admin']} />} />
        <Route path="/admin/tags" element={<ProtectedRoute element={<TManagement />} allowedRoles={['admin']} />} />
=======
        <Route path="/posts/:postId/edit" element={<UPostDetail />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutTheWebSite />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/categories" element={<ThemeFilter />} />
        <Route path="/allPosts" element={<AllPostPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<UTermsOfService />} />
        <Route path="/faq" element={<FrequentlyAskedQuestions />} />

        {/* Admin Routes */}
        <Route path="/admin/posts" element={<ProtectedRoute element={<PostManagement />} allowedRoles={['admin']} />} />
        <Route path="/admin/users" element={<ProtectedRoute element={<UserManagement />} allowedRoles={['admin']} />} />
        <Route path="/admin/categories" element={<ProtectedRoute element={<CategoriesManagement />} allowedRoles={['admin']} />} />
        <Route path="/admin/tags" element={<ProtectedRoute element={<TagManagement />} allowedRoles={['admin']} />} />
>>>>>>> 086163e (74% done)
        <Route path="/admin/posts/:postId" element={<ProtectedRoute element={<AdminPostDetail />} allowedRoles={['admin']} />} />

        {/* Redirect to login by default */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;