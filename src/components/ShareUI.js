// ShareUI.js

import React from 'react';
import ProfileIcon from './ProfileIcon';
import ShareModal from './ShareModal';
import '../styles/ShareUI.css';
import { useEffect, useState } from 'react';
import { getLoggedInUser } from '../API/auth';

const ShareUI = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handlePost = (content) => {
    // Implement posting functionality here
    console.log('Posting:', content);
  };

  return (
    <div className="share-ui-card">
      <div className="left-component">
        <ProfileIcon firstName={user?.first_name} lastName={user?.last_name} />
      </div>
      <div className="right-component">
        <input
          type="text"
          className="share-input"
          placeholder="Share something?"
          onClick={() => setShowModal(true)}
        />
      </div>
      {showModal && (
        <ShareModal onClose={() => setShowModal(false)} onPost={handlePost} />
      )}
    </div>
  );
};

export default ShareUI;
