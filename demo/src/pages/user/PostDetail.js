import React, {useEffect} from 'react';
import PostDetail from '../../components/user/PostDetail/PostDetail';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';

const Posts = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    return (
        <div>
            <Header />
            <PostDetail />
            <Footer />
        </div>
    );
};

export default Posts;