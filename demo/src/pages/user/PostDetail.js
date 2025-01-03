<<<<<<< HEAD
import React from 'react';
=======
import React, {useEffect} from 'react';
>>>>>>> 086163e (74% done)
import PostDetail from '../../components/user/PostDetail/PostDetail';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';

const Posts = () => {
<<<<<<< HEAD
=======
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
>>>>>>> 086163e (74% done)
    return (
        <div>
            <Header />
            <PostDetail />
            <Footer />
        </div>
    );
};

export default Posts;