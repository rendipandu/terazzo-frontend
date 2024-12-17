import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../data/auth/client';
import { showToast } from '../../../utils/toast.util';
import { Button, Form } from 'react-bootstrap';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token); // Simpan token di localStorage
            navigate('/dashboard'); // Redirect ke halaman home
            showToast({
                type: 'success',
                message: 'Login Berhasil!',
                autoClose: 5000
            });
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className='w-100'>
            <h1 className='mb-5 text-center'>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email/Username</Form.Label>
                <Form.Control type="text" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button className='w-100' type="submit">Login</Button>
        </Form>
    );
};

export default LoginForm;