import React, { useState } from 'react';
import { signIn } from '../API/auth';
import '../styles/SignIn.css';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!userData.username || !userData.password) {
      setError('Please enter both username and password.');
      return;
    }
  
    try {
      setLoading(true); 
      const response = await signIn(userData);
      console.log('Signed in successfully:', response);
      localStorage.setItem('user', JSON.stringify(response));
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <div className="signin-form">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="input-field" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input-field" />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleSignIn} className="signin-button" disabled={loading}>
          {loading ? <i className="fa fa-spinner fa-spin"></i> : 'Sign In'}
        </button>
        <p className="register-link">Not Registered Yet? <Link to="/signup">Register</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
