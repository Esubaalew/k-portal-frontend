import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProfilePage from './components/ProfileCard';
import Profiles from './components/ProfileList';
import ResourceList from './components/ResourceList';
import { getUserById} from './API/users'; 
import { getAllResources } from './API/resources';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Success from './components/Success';
import NotFound from './components/NotFound';

function App() {
  const [profileData, setProfileData] = useState(null);
  const [allResources, setAllResources] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const accessToken = userData ? userData.access : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 3; 
        const user = await getUserById(userId, accessToken);
        setProfileData(user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    const fetchAllResources = async () => {
      try {
        if (accessToken) {
          const resources = await getAllResources(accessToken);
          setAllResources(resources);
        }
      } catch (error) {
        console.error('Error fetching all resources:', error.message);
      }
    };

    fetchUserData();
    fetchAllResources();
  }, [accessToken]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/in" element={ <SignIn/>} />
        <Route path="/signup" element={ <SignUp/>} />
        <Route path="/profile" element={<ProfilePage profileData={profileData} />} />
        <Route path="/community" element={<Profiles  />} />
        <Route path="/resources" element={<ResourceList resources={allResources} />} />
        <Route path="/success" element={<Success/>} />
        <Route path="/user/:username" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
