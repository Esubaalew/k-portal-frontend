// src/components/ChatList.js
import React, { useState, useEffect } from 'react';
import { getGroups, getAllPrivateChats } from '../API/msg';
import { useNavigate } from 'react-router-dom';
import '../styles/ChatList.css';
import Footer from './Footer';
import Header from './Header';

const ChatList = () => {
    const [groups, setGroups] = useState([]);
    const [privateChats, setPrivateChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user?.access;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const groupsData = await getGroups(accessToken);
                const privateChatsData = await getAllPrivateChats(accessToken);
                setGroups(groupsData);
                setPrivateChats(privateChatsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [accessToken]);

    const handleGroupClick = (groupId) => {
        navigate(`/group-chat/${groupId}`);
    };

    const handlePrivateChatClick = (userId) => {
        navigate(`/private-chat/${userId}`);
    };

    const handleCreateGroupChat = () => {
        navigate('/create-group-chat');
    };

    const handleCreatePrivateChat = () => {
        navigate('/create-private-chat');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
    <Header/>
        <div className="chat-list-container">
            <div className="chat-list-section">
                <div className="chat-list-header">
                    <h2>Groups</h2>
                    <button onClick={handleCreateGroupChat}>Create Group Chat</button>
                </div>
                {groups.length === 0 ? (
                    <p>No group chats available. Create one!</p>
                ) : (
                    <ul className="chat-list">
                        {groups.map(group => (
                            <li key={group.id} onClick={() => handleGroupClick(group.id)}>
                                <div className="chat-item">
                                    <div className="chat-avatar">{group.name[0]}</div>
                                    <div className="chat-info">
                                        <div className="chat-name">{group.name}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="chat-list-section">
                <div className="chat-list-header">
                    <h2>Private Chats</h2>
                    <button onClick={handleCreatePrivateChat}>Create Private Chat</button>
                </div>
                {privateChats.length === 0 ? (
                    <p>No private chats available. Create one!</p>
                ) : (
                    <ul className="chat-list">
                        {privateChats.map(chat => (
                            <li key={chat.user.id} onClick={() => handlePrivateChatClick(chat.user.id)}>
                                <div className="chat-item">
                                    <div className="chat-avatar">{chat.user.username[0]}</div>
                                    <div className="chat-info">
                                        <div className="chat-name">{chat.user.username}</div>
                                        <div className="chat-last-message">{chat.latest_message ? chat.latest_message.content : 'No messages'}</div>
                                    </div>
                                    <div className="chat-timestamp">{chat.latest_message ? new Date(chat.latest_message.timestamp).toLocaleTimeString() : ''}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default ChatList;
