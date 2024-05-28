import axios from 'axios';

const domain = 'https://portal.esube.com.et/';
// const domain = 'http://localhost:8000/';

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

// Function to get a user's followers
const getUserFollowers = async (userId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/users/${userId}/followers/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user followers:', error.response.data);
        throw new Error('Error fetching user followers');
    }
};

// Function to get users followed by a user
const getUserFollowing = async (userId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/users/${userId}/following/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user following:', error.response.data);
        throw new Error('Error fetching user following');
    }
};

// Function to follow a user
const followUser = async (userId, accessToken) => {
    try {
        const response = await axios.post(`${domain}api/follow/`, { followed_user_id: userId }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error following user:', error.response.data);
        throw new Error('Error following user');
    }
};

// Function to unfollow a user
const unfollowUser = async (userId, accessToken) => {
    try {
        const response = await axios.post(`${domain}api/unfollow/`, { followed_user_id: userId }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error unfollowing user:', error.response.data);
        throw new Error('Error unfollowing user');
    }
};

// Function to update user's first name
const updateFirstName = async (userId, firstName, accessToken) => {
    try {
        const response = await axios.patch(`${domain}api/users/${userId}/`, {
            first_name: firstName
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating first name:', error.response.data);
        throw new Error('Error updating first name');
    }
};

// Function to update user's last name
const updateLastName = async (userId, lastName, accessToken) => {
    try {
        const response = await axios.patch(`${domain}api/users/${userId}/`, {
            last_name: lastName
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating last name:', error.response.data);
        throw new Error('Error updating last name');
    }
};

// Function to update user's bio
const updateBio = async (userId, bio, accessToken) => {
    try {
        const response = await axios.patch(`${domain}api/users/${userId}/`, {
            bio: bio
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating bio:', error.response.data);
        throw new Error('Error updating bio');
    }
};

// Function to update user's profile picture
const updateProfilePicture = async (userId, profilePictureFile, accessToken) => {
    const formData = new FormData();
    formData.append('profile_picture', profilePictureFile);

    try {
        const response = await axios.patch(`${domain}api/users/${userId}/`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating profile picture:', error.response.data);
        throw new Error('Error updating profile picture');
    }
};

const deactivateUser = async (userId, accessToken) => {
    try {
        const response = await axios.post(`${domain}api/users/${userId}/deactivate/`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deactivating user:', error.response.data);
        throw new Error('Error deactivating user');
    }
};

// Function to delete a user
const deleteUser = async (userId, accessToken) => {
    try {
        const response = await axios.delete(`${domain}api/users/${userId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error.response.data);
        throw new Error('Error deleting user');
    }
};

export {
    getUserById, getAllUsers, getUserByUsername, getResourcesByUser, getUserFollowers, getUserFollowing,
    followUser, unfollowUser, updateFirstName, updateLastName, updateBio, updateProfilePicture,
    deactivateUser, deleteUser
};
