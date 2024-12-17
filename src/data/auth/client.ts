import axios from 'axios';
import { useAuth } from './store';

// Base URL untuk backend
const API_URL = 'http://localhost:5000'; // Ganti dengan URL backend Anda

// Fungsi login
export const login = async (email: string, password: string) => {
    return await axios.post(`${API_URL}/auth/login`, { email, password }).then((response) => {
        if (response.data.token) {
            const setIsLogin = useAuth.getState().setIsLogin;
            setIsLogin(true);

            const setCredential = useAuth.getState().setCredential;
            setCredential(response.data.token);
        }
        return response.data;
    });
};

export const logout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token');
    const setIsLogin = useAuth.getState().setIsLogin;
    setIsLogin(false);
};