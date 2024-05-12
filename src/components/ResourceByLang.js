import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import ResourceCard from './ResourceCard';
import { getResourcesByLanguage } from '../API/resources';
import '../styles/ResourceList.css';

const ResourceByLang = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { languageId } = useParams();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const accessToken = userData ? userData.access : null;
        if (accessToken) {
        
          const resourcesData = await getResourcesByLanguage(languageId, accessToken);
          setResources(resourcesData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error.message);
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [languageId]); 

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

export default ResourceByLang
