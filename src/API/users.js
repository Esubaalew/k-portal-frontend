import axios from 'axios';

const getUserById = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error.response.data);
        throw new Error('Error fetching user');
    }
};

export { getUserById };