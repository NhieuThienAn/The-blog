<<<<<<< HEAD
import React from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>> 086163e (74% done)
import Profile from '../../components/user/Profile/Profile';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
const ProfilePage = () => {
<<<<<<< HEAD
=======
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
>>>>>>> 086163e (74% done)
    return (
        <div >
            < Header />
            < Profile />
        </div>
    );
};

export default ProfilePage;