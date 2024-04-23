import React from 'react';
import '../styles/profile.css';

const getInitials = (firstName, lastName) => {
    const initials = (firstName ? firstName[0] : '') + (lastName ? lastName[0] : '');
    return initials.toUpperCase();
};

const ProfileIcon = ({ firstName, lastName }) => {
    const initials = getInitials(firstName, lastName);

    return (
        <div className="profile-picture" style={{ backgroundColor: '#ccc' }}>
            {initials}
        </div>
    );
};

export default ProfileIcon;
