import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProfilePage from './components/ProfileCard';
import Profiles from './components/ProfileList';
import ResourceList from './components/ResourceList';
import { getUserById, getAllUsers } from './API/users'; 
import { getAllResources } from './API/resources';

function App() {
  const [profileData, setProfileData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allResources, setAllResources] = useState([]);

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

    const fetchAllResources = async () => {
      try {
        const resources = await getAllResources();
        setAllResources(resources);
      } catch (error) {
        console.error('Error fetching all resources:', error.message);
      }
    };

    fetchUserData();
    fetchAllUsers();
    fetchAllResources();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage profileData={profileData} />} />
        <Route path="/community" element={<Profiles users={allUsers} />} />
        <Route path="/resources" element={<ResourceList resources={allResources} />} />
      </Routes>
    </Router>
  );
}

export default App;
