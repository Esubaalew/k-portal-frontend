import React from 'react';
import ProfileIcon from './ProfileIcon';
import '../styles/profile.css';

const ProfilePage = ({ profileData }) => {
    if (!profileData) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="card">
                <div className="top-section">
                    <ProfileIcon firstName={profileData.first_name} lastName={profileData.last_name} />
                    <div className="name-and-username">
                        <h1>{profileData.first_name} {profileData.last_name}</h1>
                        <p className="username">@{profileData.username}</p>
                    </div>
                </div>
                <p className="bio">{profileData.bio}</p>
                <div className="button-container">
                    <button className="btn follow-btn">Follow</button>
                    <button className="btn message-btn">Message</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
