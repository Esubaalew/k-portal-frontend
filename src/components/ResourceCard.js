import React, { useState, useEffect } from 'react';
import '../styles/ResourceCard.css';  
import ProfileIcon from './ProfileIcon'; 
import { getUserById } from '../API/users'; 
import { getMetadataForResource } from '../API/resources'; 

const ResourceCard = ({ resource }) => {
  const { owner, caption, url, file, photo, language, topic, date_shared, date_modified } = resource;
  const [ownerData, setOwnerData] = useState(null);
  const [fileMetadata, setFileMetadata] = useState(null); 

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

  useEffect(() => {
    const fetchFileMetadata = async () => {
      if (file) { 
        try {
          const metadata = await getMetadataForResource(resource.id);
          setFileMetadata(metadata);
        } catch (error) {
          console.error('Error fetching file metadata:', error.message);
        }
      }
    };
  
    fetchFileMetadata();
  }, [resource.id, file]); 

  // Helper function to truncate file name if too long
  const truncateFileName = (name) => {
    const maxLength = 20; // Maximum characters to show
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
  };

  return (
    <div className="resource-card">
      <div className="user-info">
        {ownerData ? (
          <ProfileIcon firstName={ownerData.first_name} lastName={ownerData.last_name} />
        ) : (
          <div className="avatar">U</div>
        )}
        <div className="user-details">
          <div className="username">{ownerData ? `${ownerData.first_name} ${ownerData.last_name}` : 'Loading...'}</div>
          <div className="time">{formatTime(date_shared)}</div>
        </div>
      </div>
      <div className="resource-details">
        <h3 className="caption">{caption}</h3>
        {url && (
          <p className="url" onClick={() => window.open(url, '_blank')}>{url}</p>
        )}
        {file && (
          <div className="file-info">
            <div className="file-metadata">
              <p> {truncateFileName(fileMetadata?.title ||'')}</p>
              <p>{fileMetadata?.type}</p>
              <p>{fileMetadata?.size} MB</p>
            </div>
            <button className="download-button" onClick={() => window.open(file, '_blank')}>Download</button>
          </div>
        )}
        {photo && (
          <div className="photo-info">
            <img src={photo} alt="Resource" className="photo" />
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

const formatTime = (time) => {
  return new Date(time).toLocaleString();
};

export default ResourceCard;