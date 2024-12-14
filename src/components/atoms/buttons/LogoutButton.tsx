import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../api/auth';
import { Button } from 'react-bootstrap';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Panggil fungsi logout
        logout();

        // Arahkan kembali ke halaman login
        navigate('/');
    };

    return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;