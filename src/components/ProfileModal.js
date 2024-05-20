import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfileModal.css';
import '../styles/SettingsModal.css';
import { deactivateUser, deleteUser } from '../API/users'; 
const ProfileModal = ({ user, onClose, onLogout }) => {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  const userData = JSON.parse(localStorage.getItem('user'));
  const accessToken = userData ? userData.access : null;

  const handleOpenSettingsModal = () => setSettingsModalOpen(true);
  const handleCloseSettingsModal = () => setSettingsModalOpen(false);

  const handleDeactivate = async () => {
    try {
      await deactivateUser(user.id, accessToken);
      alert('User deactivated');
      onClose();
    } catch (error) {
      console.error('Error deactivating user:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user.id, accessToken);
      alert('User deleted');
      onClose();
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <>
      <div className="profile-modal">
        <div className="profile-modal-header">User Menu</div>
        <div className="profile-content">
          <ul>
            <li><Link to={`/user/${user.username}`}>Profile</Link></li>
            <li onClick={handleOpenSettingsModal}>Settings</li>
            <li onClick={onLogout}>Logout</li>
          </ul>
        </div>
        <div className="close-button" onClick={onClose}>X</div>
      </div>

      {isSettingsModalOpen && (
        <div className="settings-modal">
          <div className="settings-modal-header">Settings</div>
          <div className="settings-content">
            <button onClick={handleDeactivate}>Deactivate Account</button>
            <button onClick={handleDelete}>Delete Account</button>
          </div>
          <div className="close-button" onClick={handleCloseSettingsModal}>X</div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;
