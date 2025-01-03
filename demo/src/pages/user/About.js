<<<<<<< HEAD
import React from 'react';
=======
import React, {useEffect} from 'react';
>>>>>>> 086163e (74% done)
import About from '../../components/user/About/About';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
const AboutTheWebSite = () => {
<<<<<<< HEAD
=======
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
>>>>>>> 086163e (74% done)
    return (
        <div >
            <Header />
            <About />
            <Footer />
        </div>
    );
};

export default AboutTheWebSite;