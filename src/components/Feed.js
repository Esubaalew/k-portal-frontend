import React, { useState, useEffect } from 'react';
import ShareUI from './ShareUI';
import ResourceList from './ResourceList';
import { getAllResources } from '../API/resources';
import '../styles/Feed.css';

const Feed = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const Token = JSON.parse(localStorage.getItem('user'));
        const accessToken = Token ? Token.access : null;
        const resourcesData = await getAllResources(accessToken);
        setResources(resourcesData);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="feed-container">
      <ShareUI />
      <ResourceList resources={resources} isLoading={isLoading} />
    </div>
  );
};

export default Feed;
