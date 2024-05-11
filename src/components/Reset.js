import React, { useState } from 'react';
import { requestPasswordReset } from '../API/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Reset.css';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }
  
    try {
      setLoading(true); 
      await requestPasswordReset({ email });
      console.log('Password reset request sent successfully.');
      setSuccess(true);
      // Optionally, you can automatically navigate the user to another page here
      navigate('/');
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
        <p className="success-message">Password reset link has been sent to your email.</p>
      ) : (
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
