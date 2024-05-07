import axios from 'axios';

const domain = 'https://portal.esube.com.et/';

// Function to get a user by ID
const getUserById = async (userId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/users/${userId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error.response.data);
        throw new Error('Error fetching user');
    }
};

// Function to get all users
const getAllUsers = async (accessToken) => {
    try {
        const response = await axios.get(`${domain}api/users/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error.response.data);
        throw new Error('Error fetching users');
    }
};

// Function to get a user by username
const getUserByUsername = async (username, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/user/${username}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user by username:', error.response.data);
        throw new Error('Error fetching user by username');
    }
};

// Function to get resources by user
const getResourcesByUser = async (username, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/user/${username}/resources/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching resources by user:', error.response.data);
        throw new Error('Error fetching resources by user');
    }
};

export { getUserById, getAllUsers, getUserByUsername, getResourcesByUser };