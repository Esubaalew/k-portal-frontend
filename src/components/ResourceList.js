import React from 'react';
import ResourceCard from './ResourceCard';
import '../styles/ResourceList.css';

const ResourceList = ({ resources }) => {
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
