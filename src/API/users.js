import axios from 'axios';

// Function to get a user by ID
const getUserById = async (userId, accessToken) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}/`,
    {
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
        const response = await axios.get('http://localhost:8000/api/users/', {
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
export { getUserById, getAllUsers };