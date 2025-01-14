import React, {useEffect} from 'react';
import About from '../../components/user/About/About';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
const AboutTheWebSite = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div >
            <Header />
            <About />
            <Footer />
        </div>
    );
};

export default AboutTheWebSite;