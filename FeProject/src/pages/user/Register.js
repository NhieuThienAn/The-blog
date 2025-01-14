import React, {useEffect} from 'react';
import UserForm from '../../components/user/Register/Register';

const Register = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    return (
        <div >
            <UserForm />
        </div>
    );
};

export default Register;