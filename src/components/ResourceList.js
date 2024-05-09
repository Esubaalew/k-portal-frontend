import React, { useState, useEffect } from 'react';
import ResourceCard from './ResourceCard';
import { getAllResources } from '../API/resources';
import '../styles/ResourceList.css';

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const accessToken = userData ? userData.access : null;
        if (accessToken) {
          const resourcesData = await getAllResources(accessToken);
          setResources(resourcesData);
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
    return <div className="resource-list-loading">Loading...</div>;
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
