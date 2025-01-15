import React, {useEffect} from 'react';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import ThemeFilter from '../../components/user/ThemeFilter/ThemeFilter';
const Categories = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    return (
        <div>
            <Header />
            <ThemeFilter />
            <Footer />
        </div>
    );
};

export default Categories;