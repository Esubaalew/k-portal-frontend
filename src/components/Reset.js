import React, { useState } from 'react';
import { requestPasswordReset } from '../API/auth';
import '../styles/Reset.css';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }
  
    try {
      setLoading(true); 
      await requestPasswordReset({ email });
      setSuccessMessage('Password reset link has been sent to your email.');
    } catch (error) {
      setError('Failed to send password reset request. Please try again.');
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      }
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
      <div className="reset-form">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" />
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button onClick={handleResetPassword} className="reset-button" disabled={loading}>
          {loading ? <i className="fa fa-spinner fa-spin"></i> : 'Reset Password'}
        </button>
      </div>
    </div>
  );
};

export default Reset;
