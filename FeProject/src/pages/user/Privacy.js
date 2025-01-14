// src/App.js

import React, {useEffect} from 'react';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import PrivacyPolicy from '../../components/user/Privacy/Privacy';
const Privacy = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    return (
        <div>
            <Header />
            <PrivacyPolicy/>
            <Footer />
        </div>
    );
};

export default Privacy;