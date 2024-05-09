import React, { useState, useEffect } from 'react';
import ProfileIcon from './ProfileIcon';
import '../styles/profile.css';
import { getUserByUsername, getResourcesByUser, getUserFollowers, getUserFollowing, getUserById, followUser, unfollowUser } from '../API/users';
import { useParams, useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../API/auth';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('resources');
  const [expandedResource, setExpandedResource] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false); 
  const { username } = useParams();
  const userData = JSON.parse(localStorage.getItem('user'));
  const accessToken = userData ? userData.access : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserByUsername(username, accessToken);
        setUser(user);
        const loggedInUser = await getLoggedInUser(accessToken);
        setIsOwnProfile(loggedInUser.username === username);
        if (!loggedInUser.username === username) {
          const followingUsers = await getUserFollowing(loggedInUser.id, accessToken);
          const isFollowingUser = followingUsers.some(followedUser => followedUser.followed_user === user.id);
          setIsFollowing(isFollowingUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Prompt user to login if session expired
        navigate('/in');
      }
    };

    fetchData();
  }, [username, accessToken, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResources = await getResourcesByUser(username, accessToken);
        setResources(userResources);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user resources:', error.message);
        // Prompt user to login if session expired
        navigate('/in');
      }
    };

    fetchData();
  }, [username, accessToken, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const userFollowers = await getUserFollowers(user.id, accessToken);
          const followerDetails = await Promise.all(userFollowers.map(async (follower) => {
            const userDetails = await getUserById(follower.follower, accessToken);
            return { ...follower, user: userDetails };
          }));
          setFollowers(followerDetails);

          const userFollowing = await getUserFollowing(user.id, accessToken);
          const followingDetails = await Promise.all(userFollowing.map(async (followedUser) => {
            const userDetails = await getUserById(followedUser.followed_user, accessToken);
            return { ...followedUser, user: userDetails };
          }));
          setFollowing(followingDetails);
        }
      } catch (error) {
        console.error('Error fetching followers and following:', error.message);
        // Prompt user to login if session expired
        navigate('/in');
      }
    };

    fetchData();
  }, [user, accessToken, navigate]);

  const handleFollowToggle = async () => {
    try {
      if (!user || !user.id) {
        console.error('User ID is invalid.');
        return;
      }
  
      if (isFollowing) {
        // Unfollow the user
        const unfollowResponse = await unfollowUser(user.id, accessToken);
        console.log('Unfollow response:', unfollowResponse);
        setIsFollowing(false);
      } else {
        // Follow the user
        const followResponse = await followUser(user.id, accessToken);
        console.log('Follow response:', followResponse);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error toggling follow:', error.message);
      // Handle error - show error message to the user
    }
  };
  
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="profile-container">
      {user && (
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
              {!isOwnProfile && (
                <button className="btn follow-btn" onClick={handleFollowToggle} disabled={isFollowing}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              )}
              {!isOwnProfile && (
                <button className="btn message-btn">Message</button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="tabs-container">
        <button className={`tab ${selectedTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabClick('profile')}>Profile</button>
        <button className={`tab ${selectedTab === 'resources' ? 'active' : ''}`} onClick={() => handleTabClick('resources')}>Resources</button>
        <button className={`tab ${selectedTab === 'following' ? 'active' : ''}`} onClick={() => handleTabClick('following')}>Following</button>
        <button className={`tab ${selectedTab === 'followers' ? 'active' : ''}`} onClick={() => handleTabClick('followers')}>Followers</button>
      </div>

      <div className="tab-content">
        {selectedTab === 'following' && (
          <div className="following-tab">
            {following.length > 0 ? (
              <ul>
                {following.map((followedUser) => (
                  <li key={followedUser.id}>
                    <div className="user-details">
                      <span className="user-icon">👤</span>
                      <p>{followedUser.user.first_name} {followedUser.user.last_name} (@{followedUser.user.username})</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users being followed.</p>
            )}
          </div>
        )}

        {selectedTab === 'followers' && (
          <div className="followers-tab">
            {followers.length > 0 ? (
              <ul>
                {followers.map((follower) => (
                  <li key={follower.id}>
                    <div className="user-details">
                      <span className="user-icon">👤</span>
                      <p>{follower.user.first_name} {follower.user.last_name} (@{follower.user.username})</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No followers.</p>
            )}
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
