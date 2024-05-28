import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatWindow.css';
import SendMail from './SendMail';
import { sendEmail } from '../API/msg';

const ChatWindow = ({ messages, onSendMessage, userDetails }) => {
    userDetails = userDetails || {};
    const [newMessage, setNewMessage] = useState('');
    const [isSendMailOpen, setIsSendMailOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const accessToken = JSON.parse(localStorage.getItem('user'))?.access;

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSendEmail = async (emailData) => {
        try {
            await sendEmail({
                subject: emailData.subject,
                content: emailData.content,
                recipient_email: userDetails.email,
                attachment: emailData.attachment
            }, accessToken);
        
        
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email');
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-avatar">
                    {userDetails.username ? userDetails.username[0].toUpperCase() : 'U'}
                </div>
                <div className="chat-user-info">
                    <div className="chat-user-name">{userDetails.username}</div>
                    <div className="chat-user-status">{userDetails.status || 'Online'}</div>
                </div>
                <div className="chat-actions">
                    <button className="chat-action-btn" onClick={() => setIsSendMailOpen(true)}>📧</button>
                    <button className="chat-action-btn">📞</button>
                </div>
            </div>
            <div className="chat-messages">
                {messages.map((message) => (
                    <div key={message.id} className="chat-message">
                        <div className={`message-bubble ${message.sender.id === userDetails.id ? 'sent' : 'received'}`}>
                            {message.content}
                            <div className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <textarea
                    rows="3"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage} className="send-btn">Send</button>
            </div>
            <SendMail 
                isOpen={isSendMailOpen} 
                onClose={() => setIsSendMailOpen(false)} 
                onSendEmail={handleSendEmail} 
                userDetails={userDetails} 
            />
        </div>
    );
};

export default ChatWindow;
