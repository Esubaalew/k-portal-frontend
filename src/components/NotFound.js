// NotFound.js

import React from 'react';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 Not Found</h1>
      <p className="not-found-message">The page you are looking for does not exist.</p>
      <a href="/" className="not-found-link">Go back to Home</a>
    </div>
  );
};

export default NotFound;
