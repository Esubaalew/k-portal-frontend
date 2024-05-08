import React, { useState, useEffect } from 'react';
import ProfileIcon from './ProfileIcon';
import '../styles/profile.css';
import { getUserByUsername, getResourcesByUser } from '../API/users';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('resources');
  const [expandedResource, setExpandedResource] = useState(null);
  const { username } = useParams();
  const userData = JSON.parse(localStorage.getItem('user'));
  const accessToken = userData ? userData.access : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserByUsername(username, accessToken);
        setUser(user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [username, accessToken]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const userResources = await getResourcesByUser(username, accessToken);
        setResources(userResources);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user resources:', error.message);
      }
    };

    fetchResources();
  }, [username, accessToken]);

  if (!user) {
    return <div>Loading user data...</div>; 
  }

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="card">
          <div className="top-section">
            <ProfileIcon firstName={user.first_name} lastName={user.last_name} />
            <div className="name-and-username">
              <h1>{user.first_name} {user.last_name}</h1> 
              <p className="username">@{user.username}</p>
            </div>
          </div>
          <p className="bio">{user.bio}</p>
          <div className="button-container">
            <button className="btn follow-btn">Follow</button>
            <button className="btn message-btn">Message</button>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <button className={`tab ${selectedTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabClick('profile')}>Profile</button>
        <button className={`tab ${selectedTab === 'resources' ? 'active' : ''}`} onClick={() => handleTabClick('resources')}>Resources</button>
      </div>

      <div className="tab-content">
        {selectedTab === 'profile' && (
          <div className="profile-tab">
            {/* Content for profile tab */}
          </div>
        )}

{selectedTab === 'resources' && (
  <div className="resources-tab">

    {loading ? (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    ) : (
      <div>
        {resources.length === 0 ? (
          <p>No resources available</p>
        ) : (
          resources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-header">
                <span className="resource-topic" style={{ color: '#007bff' }}>{resource.topic}</span>
                <span className="resource-language" style={{ color: '#555' }}>{resource.language}</span>
              </div>
              <p className="resource-caption">
  {resource.caption.length > 100 && expandedResource !== resource.id ? (
    <>
      {resource.caption.slice(0, 100)}...
      <span className="see-more-link" onClick={() => setExpandedResource(resource.id)}>See More</span>
    </>
  ) : (
    <>
      {resource.caption}
      {resource.caption.length > 100 && (
        <span className="see-less-link" onClick={() => setExpandedResource(null)}>See Less</span>
      )}
    </>
  )}
</p>

              <div className="resource-date">Shared on: {new Date(resource.date_shared).toLocaleDateString()}</div>
            </div>
          ))
        )}
      </div>
    )}
  </div>
)}
      </div>
    </div>
  );
};

export default ProfilePage;
