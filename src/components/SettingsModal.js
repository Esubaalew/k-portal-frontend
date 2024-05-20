import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deactivateUser, deleteUser } from '../API/users';
import '../styles/SettingsModal.css';

const SettingsModal = ({ user, accessToken, onClose }) => {
  const navigate = useNavigate();

  const handleDeactivate = async () => {
    try {
      await deactivateUser(user.id, accessToken);
      alert('User deactivated');
      navigate('/login'); // Navigate to login or any other route
    } catch (error) {
      console.error('Error deactivating user:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user.id, accessToken);
      alert('User deleted');
      navigate('/login'); // Navigate to login or any other route
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <div className="settings-modal">
      <div className="settings-modal-header">Settings</div>
      <div className="settings-content">
        <button onClick={handleDeactivate}>Deactivate Account</button>
        <button onClick={handleDelete}>Delete Account</button>
      </div>
      <div className="close-button" onClick={onClose}>X</div>
    </div>
  );
};

export default SettingsModal;
