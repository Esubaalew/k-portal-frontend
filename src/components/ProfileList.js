import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import '../styles/ProfileList.css';
import { getAllUsers } from '../API/users';
import { useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';
import Header from './Header';
import Footer from './Footer';

const Profiles = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  const accessToken = userData ? userData.access : null;

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const allUsers = await getAllUsers(accessToken);
        setUsers(allUsers);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching all users:', error.message);
        navigate('/in');
      }
    };

    fetchAllUsers();
  }, [accessToken, navigate]);

  return (
    <>
      <Header />
      <div className="profiles-container">
        <h1>All Profiles</h1>
        {loading ? (
          <div className="spinner-container">
            <Triangle visible={true} height="100" width="100" color="#007bff" ariaLabel="rotating-triangles-loading" wrapperStyle={{}} wrapperClass="" />
            <p className="loading-text">Getting users...</p> 
          </div>
        ) : (
          <div className="profiles">
            {users.map(user => (
              <Profile key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profiles;
