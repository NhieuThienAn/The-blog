// src/App.js

<<<<<<< HEAD
import React from 'react';
=======
import React, {useEffect} from 'react';
>>>>>>> 086163e (74% done)
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import ThemeFilter from '../../components/user/ThemeFilter/ThemeFilter';
const Categories = () => {
<<<<<<< HEAD
=======
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
>>>>>>> 086163e (74% done)
    return (
        <div>
            <Header />
            <ThemeFilter />
            <Footer />
        </div>
    );
};

export default Categories;