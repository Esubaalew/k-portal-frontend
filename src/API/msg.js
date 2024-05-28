import axios from "axios";

const domain = 'http://localhost:8000/';

// Function to GET GROUPS

const getGroups = async (accessToken) => { 
    try {
        const response = await axios.get(`${domain}api/chat/groups/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting groups:', error.response.data);
        throw new Error('Error getting groups');
    }
}


// Function to GET GROUP MESSAGES

const getGroupMessages = async (groupId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/chat/messages/group/${groupId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting group messages:', error.response.data);
        throw new Error('Error getting group messages');
    }
}

// Function to GET USER MESSAGES

const getUserMessages = async (userId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/chat/messages/private/${userId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting user messages:', error.response.data);
        throw new Error('Error getting user messages');
    }
}
// Function to GET ALL PRIVATE CHATS
const getAllPrivateChats = async (accessToken) => {
    try {
        const response = await axios.get(`${domain}api/chat/private-chats/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting all private chats:', error.response.data);
        throw new Error('Error getting all private chats');
    }
}

// Function to SEND MESSAGE

const sendMessage = async (messageData, accessToken) => {
    try {
        const response = await axios.post(`${domain}api/chat/messages/`, messageData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error.response.data);
        throw new Error('Error sending message');
    }
}
// function to create a group chat
const createGroupChat = async (groupData, accessToken) => {
    try {
        const response = await axios.post(`${domain}api/chat/groups/`, groupData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating group chat:', error.response.data);
        throw new Error('Error creating group chat');
    }
}

// Function to GET Group Members

const getGroupMembers = async (groupId, accessToken) => {
    try {
        const response = await axios.get(`${domain}api/chat/groups/${groupId}/members/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting group members:', error.response.data);
        throw new Error('Error getting group members');
    }
}
export const sendEmail = async (data, accessToken) => {
    const formData = new FormData();
    formData.append('subject', data.subject);
    formData.append('content', data.content);
    formData.append('recipient_email', data.recipient_email);
    if (data.attachment) {
        formData.append('attachment', data.attachment);
    }

    const response = await axios.post(`${domain}api/chat/send-email/`, formData, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};
export { getGroups, getGroupMessages, getUserMessages, sendMessage, getAllPrivateChats, createGroupChat, getGroupMembers };
