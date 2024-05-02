import React from 'react';
import ResourceCard from './ResourceCard';
import '../styles/ResourceList.css';

const ResourceList = ({ resources, isLoading }) => {
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
