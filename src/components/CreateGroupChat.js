// src/components/CreateGroupChat.js
import React, { useState, useEffect } from 'react';
import { createGroupChat, sendMessage } from '../API/msg';
import { getAllUsers } from '../API/users';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateGroupChat.css'; 

const CreateGroupChat = () => {
    const [users, setUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user?.access;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const usersData = await getAllUsers(accessToken);
                setUsers(usersData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [accessToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const group = await createGroupChat({ name: groupName, members: selectedUsers }, accessToken);
            await sendMessage({ content: 'Hello, welcome to the group!', group_id: group.id }, accessToken);
            navigate(`/group-chat/${group.id}`);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUserChange = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setSelectedUsers(value);
    };

    return (
        <div className="create-group-chat-container">
            <h2>Create Group Chat</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="create-chat-form">
                <label>
                    Group Name:
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="group-name-input"
                    />
                </label>
                <label>
                    Select Users:
                    <select
                        multiple={true}
                        value={selectedUsers}
                        onChange={handleUserChange}
                        className="user-select"
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit" disabled={!groupName || selectedUsers.length === 0} className="submit-btn">
                    Create Group
                </button>
            </form>
        </div>
    );
};

export default CreateGroupChat;
