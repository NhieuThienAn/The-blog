import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, Suspense, lazy } from 'react';

// Lazy load Admin Pages
const CategoriesManagement = lazy(() => import('./pages/admin/CategoriesManagement'));
const PostManagement = lazy(() => import('./pages/admin/PostManagement'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const TagManagement = lazy(() => import('./pages/admin/TagManagement'));
const AdminPostDetail = lazy(() => import('./components/admin/PostManagement/PostDetail'));

// Lazy load User Pages
const Posts = lazy(() => import('./pages/user/PostsList'));
const Loading = lazy(() => import('./pages/user/Loading'));
const Profile = lazy(() => import('./pages/user/Profile'));
const Register = lazy(() => import('./pages/user/Register'));
const PostDetail = lazy(() => import('./pages/user/PostDetail'));
const AboutTheWebSite = lazy(() => import('./pages/user/About'));
const ThemeFilter = lazy(() => import('./pages/user/ThemeFilter'));
const AllPostPage = lazy(() => import('./pages/user/AllPost'));
const UPostDetail = lazy(() => import('./pages/user/UPostDetail'));
const Privacy = lazy(() => import('./pages/user/Privacy'));
const UTermsOfService = lazy(() => import('./pages/user/Term'));
const FrequentlyAskedQuestions = lazy(() => import('./pages/user/FAQ'));
const ContactUs = lazy(() => import('./pages/user/Contact'));

// Lazy load Common Pages
const Login = lazy(() => import('./pages/Login'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* User Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
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
          <Route path="/admin/posts/:postId" element={<ProtectedRoute element={<AdminPostDetail />} allowedRoles={['admin']} />} />

          {/* Redirect to login by default */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;