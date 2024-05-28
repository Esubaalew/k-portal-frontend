import React, { useState, useEffect, useCallback } from 'react';
import { getGroupMessages, sendMessage } from '../API/msg';
import ChatWindow from './ChatWindow';
import { useParams } from 'react-router-dom';
import { getUserById } from '../API/users';
import Header from './Header';
import Footer from './Footer';

const GroupChat = () => {
    const { groupId } = useParams();
    const [userDetails, setUserDetails] = useState({});
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user?.access;

    const fetchMessages = useCallback(async () => {
        try {
            setLoading(true);
            const [messagesData, groupData] = await Promise.all([
                getGroupMessages(groupId, accessToken),
                getUserById(groupId, accessToken) 
            ]);
            setMessages(messagesData);
            setUserDetails(groupData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [groupId, accessToken]);

    useEffect(() => {
        if (accessToken) {
            fetchMessages();
        }
    }, [fetchMessages, groupId, accessToken]);

    const handleSendMessage = async (content) => {
        try {
            await sendMessage({ content, group_id: groupId }, accessToken);
            fetchMessages();
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
    <Header/>
        <div className='private-chat-container'>
            <ChatWindow 
                messages={messages} 
                onSendMessage={handleSendMessage}
                userDetails={userDetails} 
            />
        </div>
        <Footer/>
        </>
    );
};

export default GroupChat;
