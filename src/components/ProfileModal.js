// ProfileModal.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfileModal.css';

const ProfileModal = ({ user, onClose, onLogout }) => {
  return (
    <div className="profile-modal">
      <div className="profile-modal-header">User Menu</div>
      <div className="profile-content">
        <ul>
          <li><Link to={`/user/${user.username}`}>Profile</Link></li>
          <li onClick={onLogout}>Logout</li>
        </ul>
      </div>
      <div className="close-button" onClick={onClose}>X</div>
    </div>
  );
};

export default ProfileModal;
