import axios from "axios";

const domain = "https://portal.esube.com.et/";

// Function to get all comments
const getAllComments = async (accessToken) => {
    try {
        const response = await axios.get(`${domain}api/comments/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error.response.data);
        throw new Error("Error fetching comments");
    }
};

// Function to get a comment by ID
const getCommentById = async (commentId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/comments/${commentId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching comment:', error.response.data);
        throw new Error('Error fetching comment');
    }
}

// Function to add a comment
const addComment = async (commentData, accessToken) => {
    try {
        const response = await axios.post(`${domain}api/comments/`, commentData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error.response.data);
        throw new Error('Error adding comment');
    }
}


// Function to update a comment
const updateComment = async (commentId, comment, accessToken) => {
    try {
        const response = await axios.put(`${domain}api/comments/${commentId}/`, { comment }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating comment:', error.response.data);
        throw new Error('Error updating comment');
    }
}

// Function to delete a comment
const deleteComment = async (commentId, accessToken) => {
    try {
        const response = await axios.delete(`${domain}api/comments/${commentId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error.response.data);
        throw new Error('Error deleting comment');
    }
}

export { 
    getAllComments, 
    getCommentById,
    addComment,
    updateComment,
    deleteComment
};
