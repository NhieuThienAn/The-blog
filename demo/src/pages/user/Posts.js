import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from '../../components/user/PostList/PostList';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import RecommendPost from '../../components/user/RecommendPost/RecommendPost';
const Posts = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className='mr50'>
            <Header />
            <PostList />
            <RecommendPost />
            <Footer />
        </div>
    );
};

export default Posts;