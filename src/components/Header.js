import React, { useState, useEffect, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faUsers, faCodeBranch } from '@fortawesome/free-solid-svg-icons'; // Importing the icon for Repos
import '../styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../API/auth';
import Search from './Search'; 

const ProfileModal = React.lazy(() => import('./ProfileModal'));
const ProfileIcon = React.lazy(() => import('./ProfileIcon'));

function Header() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const Token = JSON.parse(localStorage.getItem('user'));
        const accessToken = Token ? Token.access : null;
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
      navigate('/');
    }
  };

  return (
    <header className="Header">
      <Link to="/" className="header-brand">
        <h1>
        <FontAwesomeIcon icon={faLaptopCode} className="header-icon" /> Portal
        </h1>
      </Link>
      {user && (
        <>
          <Search />
          <nav>
            <ul>
              <li>
                <Link to="/community">
                  <FontAwesomeIcon icon={faUsers} /> Community
                </Link>
              </li>
              <li>
                <Link to="/repos">
                  <FontAwesomeIcon icon={faCodeBranch} /> Repos
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
      <div className="profile-section">
        {user ? (
          <>
            <Suspense fallback={<div>Loading profile...</div>}>
              <div className="profile-icon" onClick={() => setShowModal(!showModal)}>
                <ProfileIcon firstName={user.first_name} lastName={user.last_name} />
              </div>
            </Suspense>
            {showModal && (
              <Suspense fallback={<div>Loading modal...</div>}>
                <ProfileModal
                  user={user}
                  onClose={() => setShowModal(false)}
                  onLogout={handleLogout}
                />
              </Suspense>
            )}
          </>
        ) : (
          <Link to="/in" className='get-started'>Get Started</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
