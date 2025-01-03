// src/App.js

<<<<<<< HEAD
import React from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>> 086163e (74% done)
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import AllPostList from '../../components/user/AllPost/AllPost';
const AllPostPage = () => {
<<<<<<< HEAD
    return (
        <div>
            <Header />
            <AllPostList/>
=======
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Header />
            <AllPostList />
>>>>>>> 086163e (74% done)
            <Footer />
        </div>
    );
};

export default AllPostPage;