import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProfilePage from './components/ProfileCard';
import { getUserById, getAllUsers } from './API/users'; 
import { useState, useEffect } from 'react';
import Profiles from './components/ProfileList';

function App() {
  const [profileData, setProfileData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const userId = 3; 
              const user = await getUserById(userId);
              setProfileData(user);
          } catch (error) {
              console.error('Error fetching user data:', error.message);
          }
      };
      const fetchAllUsers = async () => {
        try {
          const users = await getAllUsers();
          setAllUsers(users);
        } catch (error) {
          console.error('Error fetching all users:', error.message);
        }
      };
      fetchUserData();
      fetchAllUsers();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage  profileData={profileData}/>} />
        <Route path="/community" element={<Profiles users={allUsers} />} />
      </Routes>
    </Router>
  );
}

export default App;
