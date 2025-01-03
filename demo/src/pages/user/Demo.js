// src/App.js

<<<<<<< HEAD
import React from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>> 086163e (74% done)
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';

const App = () => {
<<<<<<< HEAD
=======
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
>>>>>>> 086163e (74% done)
    return (
        <div>
            <Header />
            {/* Add your components here */}
            <Footer />
        </div>
    );
};

export default App;