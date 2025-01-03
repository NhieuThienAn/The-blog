<<<<<<< HEAD
import React from 'react';
import Loading from '../../components/user/Loading/Loading';

const Categories = () => {
=======
import React, {useEffect} from 'react';
import Loading from '../../components/user/Loading/Loading';

const Categories = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
>>>>>>> 086163e (74% done)
    return (
        <div >
            <Loading />
        </div>
    );
};

export default Categories;