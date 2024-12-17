import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';
import LogoutButton from '../../atoms/buttons/LogoutButton';

const Sidebar: React.FC = () => {
    return (
        <div className="d-flex">
            <div className="sidebar bg-dark text-white vh-100">
                <h3 className="p-3 text-center border-bottom">Terazzo</h3>
                <Nav className="flex-column p-3">
                    <Nav.Item>
                        <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/user" className="nav-link text-white">User</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/role" className="nav-link text-white">Role</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <LogoutButton />
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;
