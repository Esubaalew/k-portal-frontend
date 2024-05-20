import React, { useState, useEffect } from 'react';
import ProfileIcon from './ProfileIcon';
import '../styles/profile.css';
import {
  getUserByUsername, getResourcesByUser, getUserFollowers, getUserFollowing,
  getUserById, followUser, unfollowUser, updateFirstName, updateLastName, updateBio, updateProfilePicture
} from '../API/users';
import { useParams, useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../API/auth';
import Header from './Header';
import { formatDistanceToNow } from 'date-fns';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  // const [profilePicture, setProfilePicture] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false); 
  const { username } = useParams();
  const userData = JSON.parse(localStorage.getItem('user'));
  const accessToken = userData ? userData.access : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await getUserByUsername(username, accessToken);
        setUser(fetchedUser);
        setFirstName(fetchedUser.first_name);
        setLastName(fetchedUser.last_name);
        setBio(fetchedUser.bio);
        const loggedInUser = await getLoggedInUser(accessToken);
        setIsOwnProfile(loggedInUser.username === username);
        if (loggedInUser.username !== username) {
          const followingUsers = await getUserFollowing(loggedInUser.id, accessToken);
          const isFollowingUser = followingUsers.some(followedUser => followedUser.followed_user === fetchedUser.id);
          setIsFollowing(isFollowingUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
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
        const unfollowResponse = await unfollowUser(user.id, accessToken);
        console.log('Unfollow response:', unfollowResponse);
        setIsFollowing(false);
      } else {
        const followResponse = await followUser(user.id, accessToken);
        console.log('Follow response:', followResponse);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error toggling follow:', error.message);
    }
  };
  
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const formatRelativeDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const handleUpdateFirstName = async () => {
    try {
      const updatedUser = await updateFirstName(user.id, firstName, accessToken);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating first name:', error.message);
    }
  };

  const handleUpdateLastName = async () => {
    try {
      const updatedUser = await updateLastName(user.id, lastName, accessToken);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating last name:', error.message);
    }
  };

  const handleUpdateBio = async () => {
    try {
      const updatedUser = await updateBio(user.id, bio, accessToken);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating bio:', error.message);
    }
  };

  const handleUpdateProfilePicture = async (e) => {
    try {
      const updatedUser = await updateProfilePicture(user.id, e.target.files[0], accessToken);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile picture:', error.message);
    }
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    // Reset form fields
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setBio(user.bio);
  };

  const handleSaveChanges = () => {

    setIsEditingProfile(false);
    handleUpdateFirstName();
    handleUpdateLastName();
    handleUpdateBio();
    // Profile picture is updated separately in handleUpdateProfilePicture
  };

 return (
    <>
    <Header/>
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
              {isOwnProfile && !isEditingProfile && (
                <button className="btn edit-profile-btn" onClick={handleEditProfile}>Edit Profile</button>
              )}
              {isOwnProfile && isEditingProfile && (
                <button className="btn save-changes-btn" onClick={handleSaveChanges}>Save Changes</button>
              )}
              {isOwnProfile && isEditingProfile && (
                <button className="btn cancel-edit-btn" onClick={handleCancelEdit}>Cancel</button>
              )}
              {!isOwnProfile && (
                <button className="btn follow-btn" onClick={handleFollowToggle} disabled={isFollowing}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              )}
              {!isOwnProfile && (
                <button className="btn message-btn">Message</button>
              )}
            </div>
            {isEditingProfile && isOwnProfile && (
              <div className="edit-profile-section">
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio"></textarea>
                <input type="file" accept="image/*" onChange={(e) => handleUpdateProfilePicture(e)} />
              </div>
            )}
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
                        <span className="resource-language" style={{ color: '#555' }}>{resource.language_name}</span>
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
                      <div className="resource-date">Shared: {formatRelativeDate(resource.date_shared)}</div>

                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
