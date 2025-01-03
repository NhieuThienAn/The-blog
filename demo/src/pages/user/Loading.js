import React, {useEffect} from 'react';
import Loading from '../../components/user/Loading/Loading';

const Categories = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    return (
        <div >
            <Loading />
        </div>
    );
};

export default Categories;