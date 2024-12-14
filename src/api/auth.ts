import axios from 'axios';

// Base URL untuk backend
const API_URL = 'http://localhost:5000'; // Ganti dengan URL backend Anda

// Fungsi login
export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });

    return response.data;
};

export const logout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token');
};