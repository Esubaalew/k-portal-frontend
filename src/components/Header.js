// Header.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';
import { getLoggedInUser } from '../API/auth';
import ProfileModal from './ProfileModal';

function Header() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = JSON.parse(localStorage.getItem('user')).access;
        const userData = await getLoggedInUser(accessToken);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
    return () => setUser(null);
  }, []);

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <header className="Header">
      <h1>
        <FontAwesomeIcon icon={faLaptopCode} className="header-icon" /> Programming Portal
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
          <li><a href="/frameworks">Frameworks</a></li>
          <li><a href="/tools">Tools</a></li>
          <li>
            <Link to="/community">Community</Link>
          </li>
        </ul>
      </nav>
      <div className="profile-section">
        {user ? (
          <>
            <div className="profile-icon" onClick={() => setShowModal(!showModal)}>
              <ProfileIcon firstName={user.first_name} lastName={user.last_name} />
            </div>
            {showModal && (
              <ProfileModal
                user={user}
                onClose={() => setShowModal(false)}
                onLogout={handleLogout}
              />
            )}
          </>
        ) : (
          <Link to="/in" className='get-started' >Get Started</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
