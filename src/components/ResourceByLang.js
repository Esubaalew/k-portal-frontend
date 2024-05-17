import React, { useState, useEffect } from 'react';
import ResourceCard from './ResourceCard';
import { getResourcesByLanguage } from '../API/resources';
import '../styles/ResourceList.css';
import { FallingLines } from 'react-loader-spinner';

const ResourceByLang = ({ languageId }) => { 
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resourcesData = await getResourcesByLanguage(languageId);
        setResources(resourcesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error.message);
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [languageId]);

  if (isLoading) {
    return (
      <div className="resource-list-loading">
        <FallingLines color="#4fa94d" width="100" visible={true} ariaLabel="falling-lines-loading" />
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

export default ResourceByLang;
