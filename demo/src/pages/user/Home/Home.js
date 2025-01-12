import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from '../../../components/user/PostList/PostList';
import Header from '../../../components/user/Header/Header';
import Footer from '../../../components/user/Footer/Footer';
import RecommendPost from '../../../components/user/RecommendPost/RecommendPost';
import Cookies from 'js-cookie'; // Import thư viện js-cookie
import LatestPosts from '../../../components/user/LatestPosts/LatestPosts';
import Newsletter from '../../../components/user/Newsletter/Newsletter';
import TopUsers from '../../../components/user/TopUsers/TopUsers';
import "./Home.scss";

const Posts = () => {
    const navigate = useNavigate();
    const topUsersRef = useRef(null);
    const newsletterRef = useRef(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, options);

        if (topUsersRef.current) {
            observer.observe(topUsersRef.current);
        }
        if (newsletterRef.current) {
            observer.observe(newsletterRef.current);
        }

        return () => {
            if (topUsersRef.current) {
                observer.unobserve(topUsersRef.current);
            }
            if (newsletterRef.current) {
                observer.unobserve(newsletterRef.current);
            }
        };
    }, []);

    return (
        <div className='mr50'>
            <Header />
            <PostList />
            <RecommendPost />
            <LatestPosts />
            <div style={{ display: 'flex', margin: "0 200px 30px" }}>
                <div ref={topUsersRef} className="animate-from-left" style={{ flex: 1, marginRight: '10px' }}>
                    <TopUsers />
                </div>
                <div ref={newsletterRef} className="animate-from-right" style={{ flex: 1, marginLeft: '10px' }}>
                    <Newsletter />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Posts;