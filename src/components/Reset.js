import React, { useState } from 'react';
import { requestPasswordReset } from '../API/auth';

import '../styles/Reset.css';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }
  
    try {
      setLoading(true); 
      await requestPasswordReset({ email });
      console.log('Password reset request sent successfully.');
      setSuccess(true); // Set success to true to show the success message
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setError('Failed to send password reset request. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      {success ? (
        // Show success message if the password reset request was successful
        <p className="success-message">A link to reset your password has been sent to your email.</p>
      ) : (
        // Otherwise, show the form to request a password reset
        <div className="reset-form">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" />
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleResetPassword} className="reset-button" disabled={loading}>
            {loading ? <i className="fa fa-spinner fa-spin"></i> : 'Reset Password'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Reset;
