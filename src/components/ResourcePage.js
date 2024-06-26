import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUserById } from '../API/users';
import { getResourceById, getMetadataForResource, getLikesForResource } from '../API/resources';
import ProfileIcon from './ProfileIcon';
import LikeCommentButtons from './LikeCommentButtons';
import { getLoggedInUser } from '../API/auth';
import '../styles/ResourcePage.css';
import { formatDistanceToNow } from 'date-fns';
import Header from './Header';
import Footer from './Footer';
import DownloadModal from './DownloadModal'; 

const ResourcePage = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [likersDetails, setLikersDetails] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLikers, setShowLikers] = useState(false);
  const [likers, setLikers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const userData = JSON.parse(localStorage.getItem('user'));
  const accessToken = userData ? userData.access : null;
  const navigate = useNavigate();

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
        navigate('/in');
      }
    };
    
    checkIfLiked();
  }, [id, accessToken, userData, navigate]);

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
    const fetchData = async () => {
      try {
        const fetchedResource = await getResourceById(id, accessToken);
        setResource(fetchedResource);

        const user = await getUserById(fetchedResource.owner, accessToken);
        setOwnerData(user);

        if (showLikers) {
          const details = await Promise.all(fetchedResource.likers.map(liker => getUserById(liker.user, accessToken)));
          setLikersDetails(details);
        }

        if (fetchedResource.file) {
          const fileMetadata = await getMetadataForResource(id, accessToken);
          setResource(prevState => ({ ...prevState, fileMetadata }));
        }
      } catch (error) {
        console.error('Error fetching resource data:', error);
      }
    };

    fetchData();
  }, [id, accessToken, showLikers]);

  const handleToggleLikers = () => {
    setShowLikers(!showLikers);
  };

  const formatTime = (time) => {
    return formatDistanceToNow(new Date(time), { addSuffix: true });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Header/>
    <div className="resource-cardd">
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
            <div className="loading">Loading...</div>
          )}
          <div className="time">{resource ? formatTime(resource.date_shared) : 'Loading...'}</div>
        </div>
      </div>
      <div className="resource-details">
        <h3 className="caption">{resource ? resource.caption : 'Loading...'}</h3>
        {resource && resource.url && (
          <p className="url" onClick={() => window.open(resource.url, '_blank')}>{resource.url}</p>
        )}
        {resource && resource.file && (
          <div className="file-info">
            <div className="file-metadata">
              <p>{resource.fileMetadata?.title || ''}</p>
              <p>{resource.fileMetadata?.type}</p>
              <p>{resource.fileMetadata?.size} MB</p>
            </div>
            <button className="download-button" onClick={openModal}>Download</button>
          </div>
        )}
        {resource && resource.photo && (
          <div className="photo-info">
            <img src={resource.photo} alt="Resource" className="photo" />
          </div>
        )}
        <div className="additional-info">
          <div className="info-item">
            <i className="fas fa-bookmark info-icon"></i>
            <span className="info-label">:</span>
            <span className="info-value">{resource ? resource.topic : 'Loading...'}</span>
          </div>
          <div className="info-item">
            <i className="fas fa-code info-icon"></i>
            <span className="info-label">:</span>
            <span className="info-value">{resource ? resource.language_name : 'Loading...'}</span>
          </div>
          <div className="info-item">
            <i className="fas fa-clock info-icon"></i>
            <span className="info-label">Edited:</span>
            <span className="info-value">{resource ? new Date(resource.date_modified).toLocaleString() : 'Loading...'}</span>
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
      <LikeCommentButtons likesCount={resource ? resource.likes_count : 0} commentsCount={resource ? resource.comments_count : 0} />
    </div>
    <Footer/>
    <DownloadModal isOpen={isModalOpen} onClose={closeModal} fileUrl={resource?.file} />
    </>
  );
};

export default ResourcePage;
