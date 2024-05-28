import React, { useState, useEffect } from 'react';
import { getLoggedInUser } from '../API/auth';
import '../styles/Chat.css';

function Chat() {
  const [message, setMessage] = useState(''); // State to hold the current message being typed
  const [messages, setMessages] = useState([]); // State to hold all messages
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); // State to hold the logged-in user's details


  console.log(user)

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setAccessToken(user?.access); // Update state only if access token is present
      } catch (error) {
        console.error('Error fetching access token:', error);
        // Handle error gracefully (e.g., display an error message or redirect to login)
      }
    };

    fetchAccessToken();
  }, []); 

  useEffect(() => {
    if (accessToken) {
    
      getLoggedInUser(accessToken)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          // Handle error gracefully (e.g., display an error message or redirect to login)
        });
    }
  }, [accessToken]); 

  useEffect(() => {
    if (accessToken) {
   
      const socket = new WebSocket('ws://localhost:8000/ws/chat/1/', [], {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include space before access token
        },
      });

      // Event handler for receiving messages from the WebSocket server
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      // Clean-up function to close WebSocket connection when component unmounts
      return () => {
        socket.close();
      };
    }
  }, [accessToken]); // Re-establish connection if access token changes

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (accessToken) {
      // Send message to WebSocket server with access token if available
      console.log(accessToken, 'accessToken')
      const socket = new WebSocket('ws://localhost:8000/ws/chat/1/', [], {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include space before access token
        },
      });

      socket.onopen = () => {
        const messageData = {
          user: user?.username || 'Anonymou', // Use logged-in user's username if available, otherwise use 'Anonymous'
          message: message,
        };
        socket.send(JSON.stringify(messageData));
      };

      setMessage(''); // Clear message input field after sending message
    } else {
      console.error('Access token is required to send messages.');
      // Handle the case where the user is not authenticated (e.g., display an error message)
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p>
              <strong>{msg.user}</strong>: {msg.message}
            </p>
          </div>
        ))}
      </div>
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          disabled={!accessToken} // Disable input field if access token is not available
        />
        <button type="submit" disabled={!accessToken}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
