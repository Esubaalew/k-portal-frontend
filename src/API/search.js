import axios from 'axios';

const domain = 'https://portal.esube.com.et/';

// Function to search for users
const searchUsers = async (query, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/account/search/?query=${query}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error.response.data);
        throw new Error('Error searching users');
    }
};

// Function to search for resources
const searchResources = async (query, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/res/search/?query=${query}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching resources:', error.response.data);
        throw new Error('Error searching resources');
    }
};

export { searchUsers, searchResources };
