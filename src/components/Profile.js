import React from 'react';
import '../styles/Profil.css';

const Profile = ({ user }) => {
  const { first_name, last_name, bio, username } = user;
  const initials = `${first_name[0]}${last_name[0]}`;

  return (
    <div className="profile-card">
      <div className="profile-picture">{initials}</div>
      <div className="profile-info">
        <h2>{first_name} {last_name}</h2>
        <p className="username">@{username}</p>
        <p className="bio">{bio}</p>
        <button className="follow-button">Follow</button>
      </div>
    </div>
  );
};

export default Profile;