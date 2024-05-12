import React from 'react';
import '../styles/NoResults.css';

const NoResults = () => (
  <div className="noResultsContainer">
    <img src="/nosearchresult.png" alt="No Results" className="noResultsImage" />
    <p className="noResultsText">Your search did not match any repositories</p>
  </div>
);

export default NoResults;
