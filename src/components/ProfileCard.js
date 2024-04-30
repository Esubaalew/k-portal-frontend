import React from 'react';
import ProfileIcon from './ProfileIcon';
import '../styles/profile.css';
import { getUserByUsername } from '../API/users';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
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


  if (!user) {
    return <div>Loading user data...</div>; 
  }

  return (
    <div className="profile-container">
      <div className="card">
        <div className="top-section">
          <ProfileIcon firstName={user.first_name} lastName={user.last_name} />
          <div className="name-and-username">
            <h1>{user.first_name} {user.last_name}</h1> {/* Access names individually */}
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
  );
};

export default ProfilePage;
