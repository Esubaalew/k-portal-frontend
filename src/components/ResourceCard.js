import React, { useState, useEffect } from 'react';
import '../styles/ResourceCard.css';  
import ProfileIcon from './ProfileIcon'; 
import { getUserById } from '../API/users';  // Import API function to get user by ID

const ResourceCard = ({ resource }) => {
  const { owner, caption, url, language, topic, date_shared, date_modified } = resource;
  const [ownerData, setOwnerData] = useState(null);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const user = await getUserById(owner);
        setOwnerData(user);
      } catch (error) {
        console.error('Error fetching owner data:', error.message);
      }
    };

    fetchOwnerData();
  }, [owner]);

  return (
    <div className="resource-card">
      <div className="user-info">
        {ownerData ? (
          <ProfileIcon firstName={ownerData.first_name} lastName={ownerData.last_name} />
        ) : (
          <div className="avatar">U</div> // Placeholder for avatar if data is loading
        )}
        <div className="user-details">
          <div className="username">{ownerData ? `${ownerData.first_name} ${ownerData.last_name}` : 'Loading...'}</div>
          <div className="time">{formatTime(date_shared)}</div>
        </div>
      </div>
      <div className="resource-details">
        <h3 className="caption">{caption}</h3>
        {resource.resource_type === 'Link' ? (
          <p className="url" onClick={() => window.open(url, '_blank')}>{url}</p>
        ) : (
          <div className="file-info">
            {/* Display file information here if it's a file resource */}
            <p><strong>File Type:</strong> {resource.resource_type}</p>
            {/* You can display more file-related info here */}
          </div>
        )}
        <div className="additional-info">
          <p><strong>Language:</strong> {language}</p>
          <p><strong>Topic:</strong> {topic}</p>
          <p><strong>Date Modified:</strong> {formatTime(date_modified)}</p>
        </div>
      </div>
    </div>
  );
};

// Helper function to format time (example)
const formatTime = (time) => {
  return new Date(time).toLocaleString();
};

export default ResourceCard;
