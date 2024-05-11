import React, { useState } from 'react';
import { confirmPasswordReset } from '../API/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/MakePass.css';
import { useParams } from 'react-router-dom';

const MakePass = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { uidb64, token } = useParams();
  
  const navigate = useNavigate();

  const handleMakePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Please enter both new password and confirm password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password must match.');
      return;
    }
  
    try {
      setLoading(true); 
    
      await confirmPasswordReset(uidb64, token, { new_password: newPassword });
      console.log('Password changed successfully.');
      navigate('/signin');
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="makepass-container">
      <h2>Change Password</h2>
      <div className="makepass-form">
        <input type="password" name="newPassword" placeholder="New Password" onChange={handleNewPasswordChange} className="input-field" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} className="input-field" />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleMakePassword} className="makepass-button" disabled={loading}>
          {loading ? <i className="fa fa-spinner fa-spin"></i> : 'Change Password'}
        </button>
      </div>
    </div>
  );
};

export default MakePass;
