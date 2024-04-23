import React from 'react';
import Profile from './Profile';
import '../styles/ProfileList.css';

const Profiles = ({ users }) => {
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
