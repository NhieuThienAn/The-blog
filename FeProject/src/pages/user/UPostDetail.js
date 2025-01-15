import React, { useEffect } from 'react';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import FixPostDetail from '../../components/user/FixPostDetail/FixPostDetail';
const UPostDetail = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Header />
            <FixPostDetail />
            <Footer />
        </div>
    );
};

export default UPostDetail;