import React, { useState, useEffect, useCallback } from 'react';
import { getUserMessages, sendMessage } from '../API/msg';
import { getUserById } from '../API/users';
import ChatWindow from './ChatWindow';
import { useParams } from 'react-router-dom'; 
import '../styles/PrivateChat.css'; 
import Header from './Header';
import Footer from './Footer';

const PrivateChat = () => {
    const { userId } = useParams();
    const [messages, setMessages] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user?.access;

    const fetchMessages = useCallback(async () => {
        try {
            setLoading(true);
            const [messagesData, userData] = await Promise.all([
                getUserMessages(userId, accessToken),
                getUserById(userId, accessToken)
            ]);
            setMessages(messagesData);
            setUserDetails(userData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [userId, accessToken]);

    useEffect(() => {
        if (accessToken) {
            fetchMessages();
        }
    }, [fetchMessages, userId, accessToken]);

    const handleSendMessage = async (content, file, photo) => {
        try {
            const messageData = {
                content,
                recipient_id: userId,
                file, 
                photo 
            };
            await sendMessage(messageData, accessToken);
            fetchMessages();
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
        <Header />
       
        <div className="private-chat-container">
            <ChatWindow 
                messages={messages} 
                onSendMessage={handleSendMessage}
                userDetails={userDetails} 
            />
        </div>
        <Footer />
        </>
    );
};

export default PrivateChat;
