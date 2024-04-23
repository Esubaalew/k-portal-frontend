import React from 'react';
import '../styles/profile.css';

const getInitials = (firstName, lastName) => {
    const initials = (firstName ? firstName[0] : '') + (lastName ? lastName[0] : '');
    return initials.toUpperCase();
};

const ProfilePage = ({ profileData }) => {
    // Check if profileData exists
    if (!profileData) {
        return <div className="loading">Loading...</div>;
    }

    const initials = getInitials(profileData.first_name, profileData.last_name);

    return (
        <div className="profile-container">
            <div className="card">
                <div className="top-section">
                    <div className="profile-picture" style={{ backgroundColor: '#ccc' }}>
                        {initials}
                    </div>
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
