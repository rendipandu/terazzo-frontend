import axios from "axios";
import { useTerazzo } from "./store";

const API_URL = 'http://localhost:5000';

// Fetch users
export const getUsers = async (
    credential: string,
): Promise<void> => {
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${credential}`,
            },
        });
        if (response && response.data) {
            const { setUserList } = useTerazzo.getState();
            setUserList(response.data); // Update the user list in the store
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Create user
export const createUser = async (
    credential: string,
    userData: { name: string; email: string; password: string, role: string }
): Promise<void> => {
    try {
        const response = await axios.post(`${API_URL}/user`, userData, {
            headers: {
                Authorization: `Bearer ${credential}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('User created successfully:', response.data);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
