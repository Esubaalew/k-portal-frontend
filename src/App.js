import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProfilePage from './components/ProfileCard';
import { getUserById } from './API/users'; 
import { useState, useEffect } from 'react';

function App() {
  const [profileData, setProfileData] = useState(null);

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

      fetchUserData();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage  profileData={profileData}/>} />
      </Routes>
    </Router>
  );
}

export default App;
