import React, { useState } from 'react';
import { signUp } from '../API/auth';
import '../styles/SignUp.css';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    const trimmedUserData = {
      first_name: userData.firstName.trim(),
      last_name: userData.lastName.trim(),  
      username: userData.username.trim(),
      email: userData.email.trim(),
      password: userData.password.trim(),
    };
  
    try {
      setLoading(true);
      const response = await signUp(trimmedUserData);
      console.log('Signed up successfully:', response);
      navigate('/in');
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred. Please try again.');
    }
    finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <div className="signup-form">
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="input-field" />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="input-field" />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="input-field" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input-field" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="input-field" />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleSignUp} className="signup-button" disabled={loading}>
        {loading ? <i className="fa fa-spinner fa-spin"></i> : 'Sign Up'}
        </button>
        <p className="log-link">Have an account? <Link to="/in">Log in</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
