// src/App.js

import React, { useEffect } from 'react';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import AllPostList from '../../components/user/AllPost/AllPost';
const AllPostPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Header />
            <AllPostList />
            <Footer />
        </div>
    );
};

export default AllPostPage;