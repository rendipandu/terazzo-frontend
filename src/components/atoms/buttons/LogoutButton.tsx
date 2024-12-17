import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../data/auth/client';
import { Button } from 'react-bootstrap';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Panggil fungsi logout
        logout();

        // Arahkan kembali ke halaman login
        navigate('/');
    };

    return <Button className='w-100' onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;