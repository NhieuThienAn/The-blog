<<<<<<< HEAD
import React from 'react';
import UserForm from '../../components/user/Register/Register';

const Register = () => {
=======
import React, {useEffect} from 'react';
import UserForm from '../../components/user/Register/Register';

const Register = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
>>>>>>> 086163e (74% done)
    return (
        <div >
            <UserForm />
        </div>
    );
};

export default Register;