import React from 'react';
import ProfileIcon from './ProfileIcon';
import '../styles/ShareUI.css';
import { useEffect, useState } from 'react';
import { getLoggedInUser } from '../API/auth';

const ShareUI = () => {
    const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const Token = JSON.parse(localStorage.getItem('user'));
        const accessToken = Token ? Token.access : null;
        const userData = await getLoggedInUser(accessToken);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
    return () => setUser(null);
  }, []);

  if (!user) {
    return <div>Loading user data...</div>; 
  }

  return (
    <div className="share-ui-card">
      <div className="left-component">
        <ProfileIcon firstName={user.first_name} lastName={user.last_name} />
      </div>
      <div className="right-component">
        <input
          type="text"
          className="share-input"
          placeholder="Share something?"
        />
      </div>
    </div>
  );
};

export default ShareUI;
