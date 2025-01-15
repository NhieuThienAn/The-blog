import React, {useEffect} from 'react';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import Contact from '../../components/user/Contact/Contact';
const ContactUs = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    return (
        <div>
            <Header />
            <Contact/>
            <Footer />
        </div>
    );
};

export default ContactUs;