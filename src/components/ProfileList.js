import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import '../styles/ProfileList.css';
import { getAllUsers } from '../API/users';
import { useNavigate } from 'react-router-dom';

const Profiles = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  const accessToken = userData ? userData.access : null;


  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const allUsers = await getAllUsers(accessToken);
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching all users:', error.message);
        navigate('/in')
      }
    };

    fetchAllUsers();
  }, [accessToken, navigate]);

  return (
    <div className="profiles-container">
      <h1>All Profiles</h1>
      <div className="profiles">
        {users.map(user => (
          <Profile key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Profiles;
