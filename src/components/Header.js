import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'; // Choose an appropriate icon
import '../styles/Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="Header">
      <h1>
        <FontAwesomeIcon icon={faLaptopCode} className="header-icon" /> Programming Portal
      </h1>
      <nav>
        <ul>
          <li><a href="/languages">Languages</a></li>
          <li><a href="/frameworks">Frameworks</a></li>
          <li><a href="/tools">Tools</a></li>
          <li><a href="/community">Community</a></li>
        </ul>
      </nav>
      <Link to="/profile" className='get-started' >Get Started</Link>
    </header>
  );
}

export default Header;
