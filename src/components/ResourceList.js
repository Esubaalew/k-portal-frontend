import React, { useState, useEffect } from 'react';
import ResourceCard from './ResourceCard';
import { getResourcesByUser, getUserById} from '../API/users'; // Assuming this function is available to fetch resources by user
import { getUserFollowing} from '../API/users'; // Assuming these functions are available
import { getLoggedInUser } from '../API/auth';

import '../styles/ResourceList.css';
import { FallingLines } from 'react-loader-spinner';

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const accessToken = userData ? userData.access : null;
        if (accessToken) {
          // Fetching the logged-in user
          const loggedInUser = await getLoggedInUser(accessToken);
          // Fetching the IDs of users the logged-in user is following
          const followingUsers = await getUserFollowing(loggedInUser.id, accessToken);
          // Fetching the usernames of users the logged-in user is following
          const promises = followingUsers.map(async (follow) => {
            // Extracting the followed_user from the Follow object
            const followedUser = follow.followed_user;
            console.log(followedUser)
            // Fetching the username of the followed_user
            const followedUserDetails = await getUserById(followedUser, accessToken);
            // Returning the username
            return followedUserDetails.username;
          });
          // Resolving all promises to get usernames
          const followingUsernames = await Promise.all(promises);
          // Fetching the resources for each user the logged-in user is following
          const resourcesPromises = followingUsernames.map(async (username) => {
            const userResources = await getResourcesByUser(username, accessToken);
            return userResources;
          });
          // Resolving all promises to get resources
          const allResources = await Promise.all(resourcesPromises);
          // Merging all resources into a single array
          const mergedResources = allResources.reduce((acc, curr) => acc.concat(curr), []);
          setResources(mergedResources);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error.message);
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);


  if (isLoading) {
    return (
      <div className="resource-list-loading">
        <FallingLines 
          color="#4fa94d" 
          width="100" 
          visible={true} 
          ariaLabel="falling-lines-loading"
        />
      </div>
    );
  }

  return (
    <div className="resource-list-container">
      <div className="resource-list">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
