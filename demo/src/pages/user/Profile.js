import React, { useEffect } from 'react';
import Profile from '../../components/user/Profile/Profile';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
const ProfilePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div >
            < Header />
            < Profile />
        </div>
    );
};

export default ProfilePage;