// src/App.js

import React, {useEffect} from 'react';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import TermsOfService from '../../components/user/TermsOfService/TermsOfService';
const UTermsOfService = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    return (
        <div>
            <Header />
            <TermsOfService/>
            <Footer />
        </div>
    );
};

export default UTermsOfService;