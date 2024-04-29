import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';
import { getLoggedInUser } from '../API/auth';

function Header() {
  const [user, setUser] = useState(null);

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
      {user ? (
        <Link to="/profile" className="profile-icon">
          <ProfileIcon firstName={user.first_name} lastName={user.last_name} />
        </Link>
      ) : (
        <Link to="/in" className='get-started' >Get Started</Link>
      )}
    </header>
  );
}

export default Header;
