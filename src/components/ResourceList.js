import React, { useState, useEffect } from 'react';
import ResourceCard from './ResourceCard';
import { getResourcesByUser, getUserById } from '../API/users';
import { getUserFollowing } from '../API/users';
import { getLoggedInUser } from '../API/auth';
import '../styles/ResourceList.css';
import { FallingLines } from 'react-loader-spinner';
import LookupModal from './LookupModal';

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const accessToken = userData ? userData.access : null;
        if (accessToken) {
          const loggedInUser = await getLoggedInUser(accessToken);
          const followingUsers = await getUserFollowing(loggedInUser.id, accessToken);
         
          const promises = followingUsers.map(async (follow) => {
            const followedUser = follow.followed_user;
            const followedUserDetails = await getUserById(followedUser, accessToken);
            return followedUserDetails.username;
          });
          const followingUsernames = await Promise.all(promises);
          const resourcesPromises = followingUsernames.map(async (username) => {
            const userResources = await getResourcesByUser(username, accessToken);
            return userResources;
          });
          const allResources = await Promise.all(resourcesPromises);
          const mergedResources = allResources.reduce((acc, curr) => acc.concat(curr), []);

        
          const sortedResources = mergedResources.sort((a, b) => new Date(b.date_shared) - new Date(a.date_shared));
          
          setResources(sortedResources);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error.message);
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);
  
  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  if (isLoading) {
    return (
      <div className="resource-list-loading">
        <FallingLines color="#4fa94d" width="100" visible={true} ariaLabel="falling-lines-loading" />
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="resource-list-container">
        <p className="no-resources-message">It seems you are not connected to any user. Please search and follow users to see resources.</p>
      </div>
    );
  }

  return (
    <div className="resource-list-container">
      <div className="resource-list">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} onTopicClick={handleTopicClick}/>
        ))}
      </div>
      {selectedTopic && <LookupModal topic={selectedTopic} onClose={handleCloseModal} showModal={true} />}
    </div>
  );
};

export default ResourceList;
