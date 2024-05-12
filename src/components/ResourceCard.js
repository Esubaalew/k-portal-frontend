import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ResourceCard.css';
import ProfileIcon from './ProfileIcon';
import LikeCommentButtons from './LikeCommentButtons';
import { getUserById } from '../API/users';
import { getLoggedInUser } from '../API/auth';
import { getMetadataForResource, 
  likeResource, 
  getResourceById,
   getLikesForResource, unlikeResource } from '../API/resources';

const ResourceCard = ({ resource }) => {
  const { id, owner, caption, url, file, photo, language_name, topic, date_shared, date_modified, comments_count } = resource;
  const [ownerData, setOwnerData] = useState(null);
  const [fileMetadata, setFileMetadata] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(resource.likes_count);
  const [likers, setLikers] = useState([]);
  const [showLikers, setShowLikers] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [likersDetails, setLikersDetails] = useState([]);
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
          const metadata = await getMetadataForResource(id, accessToken);
          setFileMetadata(metadata);
        } catch (error) {
          console.error('Error fetching file metadata:', error.message);
        }
      }
    };

    fetchFileMetadata();
  }, [id, file, accessToken, setFileMetadata]);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        if (id && accessToken) {
          const resourceData = await getResourceById(id, accessToken);
        
          if (resourceData && resourceData.likers) {
            const loggedInUserId = userData ? userData.id : null;
            const likedByLoggedInUser = resourceData.likers.some(liker => liker.user === loggedInUserId);

            setIsLiked(likedByLoggedInUser);
          }
        }
      } catch (error) {
        console.error('Error checking if liked:', error.message);
      }
    };
    
    checkIfLiked();
  }, [id, accessToken, userData]);
  
  

  useEffect(() => {
    const fetchLikers = async () => {
      try {
        if (id && accessToken) {
          const likersData = await getLikesForResource(id, accessToken);
          setLikers(likersData);
        }
      } catch (error) {
        console.error('Error fetching likers:', error.message);
      }
    };

    fetchLikers();
  }, [id, accessToken]);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        if (accessToken) {
          const user = await getLoggedInUser(accessToken);
          setLoggedInUser(user);
        }
      } catch (error) {
        console.error('Error fetching logged-in user:', error.message);
      }
    };

    fetchLoggedInUser();
  }, [accessToken]);

  useEffect(() => {
    const fetchLikersDetails = async () => {
      try {
        if (likers.length > 0 && accessToken) {
          const details = await Promise.all(likers.map(liker => getUserById(liker.user, accessToken)));
          setLikersDetails(details);
        }
      } catch (error) {
        console.error('Error fetching likers details:', error.message);
      }
    };

    fetchLikersDetails();
  }, [likers, accessToken]);

  const truncateFileName = (name) => {
    const maxLength = 20;
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleLike = async () => {
    try {
      if (!id || !accessToken) {
        console.error('Resource ID or access token is not available.');
        return;
      }
  
      const hasLiked = likers.some(liker => liker.user === loggedInUser.id);
      let updatedResource;
  
      if (hasLiked) {
        await unlikeResource(id, accessToken);
        updatedResource = await getResourceById(id, accessToken);
      } else {
        await likeResource(id, accessToken);
        updatedResource = await getResourceById(id, accessToken);
      }
  
      setLikesCount(updatedResource.likes_count);
      setIsLiked(!hasLiked);
    } catch (error) {
      console.error('Error liking/unliking resource:', error.message);
    }
  };
  
  

  const handleToggleLikers = async () => {
    if (!showLikers) {
      try {
        const likersData = await getLikesForResource(id, accessToken);
        setLikers(likersData);
        setShowLikers(true);
      } catch (error) {
        console.error('Error fetching likers:', error.message);
      }
    } else {
      setShowLikers(false);
    }
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
              <p> {truncateFileName(fileMetadata?.title || '')}</p>
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
  <div className="info-item">
    <i className="fas fa-bookmark info-icon"></i>
    <span className="info-label">:</span>
    <span className="info-value">{resource ? topic : 'Loading...'}</span>
  </div>
  <div className="info-item">
    <i className="fas fa-code info-icon"></i>
    <span className="info-label">:</span>
    <span className="info-value">{resource  ? language_name : 'Loading...'}</span>
  </div>
  <div className="info-item">
    <i className="fas fa-clock info-icon"></i>
    <span className="info-label">Edited:</span>
    <span className="info-value">{resource ? new Date(date_modified).toLocaleString() : 'Loading...'}</span>
  </div>
</div>
      </div>
      <div className="likes-info" onClick={handleToggleLikers}>
        {showLikers && (
          <div className="likers">
            <span className="likers-title">Liked by:</span>
            {likersDetails.map(liker => (
              <span key={liker.id} className="liker-name">{liker.first_name} {liker.last_name}</span>
            ))}
          </div>
        )}
        <div className="likes-count">
          {isLiked || (loggedInUser && likers.some(liker => liker.user === loggedInUser.id)) ? (
           <span>
           {likers.length > 1 ? `You and ${likers.length - 1} others liked this` : `You liked this`}
         </span>
         
          ) : (
            <span>{likers.length} {likers.length === 1 ? 'person' : 'people'} liked this</span>
          )}
        </div>
      </div>
      <LikeCommentButtons likesCount={likesCount} commentsCount={comments_count} onLike={handleLike} isLiked={isLiked} />
    </div>
  );
};

const formatTime = (time) => {
  return new Date(time).toLocaleString();
};

export default ResourceCard;
