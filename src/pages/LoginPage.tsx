import React from 'react';
import LoginForm from '../components/organisms/forms/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <div className='min-vw-100 min-vh-100 p-5 d-flex justify-content-center align-items-center'>
            <LoginForm />
        </div>
    );
};

export default LoginPage;