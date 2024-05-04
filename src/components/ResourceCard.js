import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/ResourceCard.css';  
import ProfileIcon from './ProfileIcon'; 
import LikeCommentButtons from './LikeCommentButtons';
import { getUserById } from '../API/users'; 
import { getMetadataForResource } from '../API/resources'; 

const ResourceCard = ({ resource }) => {
  const { owner, caption, url, file, photo, language, topic, date_shared, date_modified, likes_count, comments_count } = resource;
  const [ownerData, setOwnerData] = useState(null);
  const [fileMetadata, setFileMetadata] = useState(null);
  const [expanded, setExpanded] = useState(false); 
  const userData = JSON.parse(localStorage.getItem('user'));
  const accessToken = userData ? userData.access : null;

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        if (accessToken) {
          const user = await getUserById(owner, accessToken);
          setOwnerData(user);
        }
      } catch (error) {
        console.error('Error fetching owner data:', error.message);
      }
    };

    fetchOwnerData();
  }, [owner, accessToken, setOwnerData]);

  useEffect(() => {
    const fetchFileMetadata = async () => {
      if (file && accessToken) { 
        try {
          const metadata = await getMetadataForResource(resource.id, accessToken);
          setFileMetadata(metadata);
        } catch (error) {
          console.error('Error fetching file metadata:', error.message);
        }
      }
    };
  
    fetchFileMetadata();
  }, [resource.id, file, accessToken, setFileMetadata]); 

  const truncateFileName = (name) => {
    const maxLength = 20; 
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="resource-card">
      <div className="user-info">
        {ownerData ? (
          <Link to={`/user/${ownerData.username}`}>
            <ProfileIcon firstName={ownerData.first_name} lastName={ownerData.last_name} />
          </Link>
        ) : (
          <div className="avatar">U</div>
        )}
        <div className="user-details">
          {ownerData ? (
            <Link to={`/user/${ownerData.username}`} className="username">
              {`${ownerData.first_name} ${ownerData.last_name}`}
            </Link>
          ) : (
            <div>Loading...</div>
          )}
          <div className="time">{formatTime(date_shared)}</div>
        </div>
      </div>
      <div className="resource-details">
        <h3 className="caption" onClick={caption.length > 100 ? toggleExpand : null}>
          {expanded || caption.length <= 100 ? caption : `${caption.slice(0, 100)}...`}
          {caption.length > 100 && <span className="see-more">{expanded ? 'See less' : 'See more'}</span>}
        </h3>
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
      <LikeCommentButtons likesCount={likes_count} commentsCount={comments_count} /> 
    </div>
  );
};

const formatTime = (time) => {
  return new Date(time).toLocaleString();
};

export default ResourceCard;
