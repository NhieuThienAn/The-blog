import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { startTokenRefresh } from './components/TokenService';
import Cookies from 'js-cookie';

// Lazy load pages
const CategoriesManagement = lazy(() => import('./pages/admin/CategoriesManagement'));
const PostManagement = lazy(() => import('./pages/admin/PostManagement'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const TagManagement = lazy(() => import('./pages/admin/TagManagement'));
const AdminPostDetail = lazy(() => import('./components/admin/PostManagement/PostDetail'));
const StatisticsManagement = lazy(() => import('./components/admin/StatisticsManagement/StatisticsManagement'));
const Posts = lazy(() => import('./pages/user/Home/Home'));
const Loading = lazy(() => import('./pages/user/Loading'));
const Profile = lazy(() => import('./pages/user/Profile'));
const PostDetail = lazy(() => import('./pages/user/PostDetail'));
const AboutTheWebSite = lazy(() => import('./pages/user/About'));
const ThemeFilter = lazy(() => import('./pages/user/ThemeFilter'));
const AllPostPage = lazy(() => import('./pages/user/AllPost'));
const UPostDetail = lazy(() => import('./pages/user/UPostDetail'));
const Privacy = lazy(() => import('./pages/user/Privacy'));
const UTermsOfService = lazy(() => import('./pages/user/Term'));
const FrequentlyAskedQuestions = lazy(() => import('./pages/user/FAQ'));
const ContactUs = lazy(() => import('./pages/user/Contact'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));


const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const token = Cookies.get('token');
  if(token) {
    startTokenRefresh();
  }  
  
  // Define routes in an array for better scalability and readability
  const userRoutes = [
    { path: '/posts', element: <Posts /> },
    { path: '/posts/:postId', element: <PostDetail /> },
    { path: '/posts/:postId/edit', element: <UPostDetail /> },
    { path: '/loading', element: <Loading /> },
    { path: '/profile', element: <Profile /> },
    { path: '/about', element: <AboutTheWebSite /> },
    { path: '/contact', element: <ContactUs /> },
    { path: '/categories', element: <ThemeFilter /> },
    { path: '/allPosts', element: <AllPostPage /> },
    { path: '/privacy', element: <Privacy /> },
    { path: '/terms', element: <UTermsOfService /> },
    { path: '/faq', element: <FrequentlyAskedQuestions /> },
  ];

  const adminRoutes = [
    { path: '/admin/posts', element: <PostManagement /> },
    { path: '/admin/users', element: <UserManagement /> },
    { path: '/admin/categories', element: <CategoriesManagement /> },
    { path: '/admin/tags', element: <TagManagement /> },
    { path: '/admin/posts/:postId', element: <AdminPostDetail /> },
    { path: '/admin/statistics', element: <StatisticsManagement /> },
  ];

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Redirect from the root to /posts */}
          <Route path="/" element={<Navigate to="/posts" />} />

          {/* User Routes */}
          {userRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Admin Routes with ProtectedRoute */}
          {adminRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<ProtectedRoute element={route.element} allowedRoles={['admin']} />}
            />
          ))}

          <Route path="/posts" element={<Navigate to="/posts" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;