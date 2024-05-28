import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../API/users';
import { sendMessage } from '../API/msg'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/CreatePrivateChat.css'; // Import the CSS file

const CreatePrivateChat = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
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
            await sendMessage({ content: 'Hello!', recipient_id: selectedUser }, accessToken);
            navigate(`/private-chat/${selectedUser}`);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="create-private-chat-container">
            <h2>Create Private Chat</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="create-chat-form">
                <label>
                    Select User:
                    <select 
                        value={selectedUser} 
                        onChange={(e) => setSelectedUser(e.target.value)} 
                        className="user-selec"
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                    </select>
                </label>
                <button type="submit" disabled={!selectedUser} className="submit-btn">
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default CreatePrivateChat;
