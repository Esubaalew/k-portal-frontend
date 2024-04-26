import React, { useState } from 'react';
import { signIn } from '../API/auth';
import '../styles/SignIn.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await signIn(userData);
      console.log('Signed in successfully:', response);
      navigate('/success');
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid credentials. Please try again.');
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
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
};

export default SignIn;
