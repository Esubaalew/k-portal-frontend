import axios from 'axios';

const domain = 'https://portal.esube.com.et/';

// Function to like a resource
const likeResource = async (resourceId, accessToken) => {
    try {
        const response = await axios.post(`${domain}api/resources/${resourceId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        handleRequestError(error);
    }
};

// Function to unlike a resource
const unlikeResource = async (resourceId, accessToken) => {
    try {
        const response = await axios.delete(`${domain}api/resources/${resourceId}/unlike`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        handleRequestError(error);
    }
};

// Function to post a comment
const postComment = async (resourceId, comment, accessToken) => {
    try {
        const response = await axios.post(`${domain}api/resources/${resourceId}/comments`, { comment }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        handleRequestError(error);
    }
};

// Function to fetch comments for a resource
const getCommentsForResource = async (resourceId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/comments/resource/${resourceId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        handleRequestError(error);
    }
};

// Function to fetch likes for a resource
const getLikesForResource = async (resourceId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/resources/${resourceId}/likes`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        handleRequestError(error);
    }
};

// Function to handle request errors
const handleRequestError = (error) => {
    console.error('Error:', error.response ? error.response.data : error);
    throw new Error('Error fetching data');
};


export { likeResource, unlikeResource, postComment, getCommentsForResource, getLikesForResource };