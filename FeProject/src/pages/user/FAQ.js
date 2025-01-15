import React, {useEffect} from 'react';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import FAQ from '../../components/user/FAQ/FAQ';
const FrequentlyAskedQuestions = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    return (
        <div>
            <Header />
            <FAQ/>
            <Footer />
        </div>
    );
};

export default FrequentlyAskedQuestions;