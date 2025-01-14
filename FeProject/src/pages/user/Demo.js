// src/App.js

import React, { useEffect } from 'react';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';

const App = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Header />
            {/* Add your components here */}
            <Footer />
        </div>
    );
};

export default App;