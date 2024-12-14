import React from 'react';
import LogoutButton from '../components/atoms/buttons/LogoutButton';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <LogoutButton />
        </div>
    );
};

export default HomePage;