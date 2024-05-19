// LookupModal.js

import React, { useState, useEffect } from 'react';
import '../styles/LookupModal.css';
import { searchWikipedia, getWikipediaArticle } from '../API/wiki';

const LookupModal = ({ topic, onClose, showModal }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.access : null;

  useEffect(() => {
    setSearchResults([]);
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await searchWikipedia(query, accessToken);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleGetArticle = async (title) => {
    try {
      setLoading(true);
      const article = await getWikipediaArticle(title, accessToken);
      setSelectedArticle(article);
      setLoading(false);
      setExpanded(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={`modal ${showModal ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">ENIMAR Lookup</h2>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <h3 className="topic-heading">Topic: {topic}</h3>
          <input
            type="text"
            placeholder="Search Wikipedia..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch} disabled={!query || loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          {error && <p className="error-message">{error}</p>}
          <button onClick={toggleExpand} className="toggle-button">
            {expanded ? 'Hide Results' : 'Show Results'}
          </button>
          <div className={`search-results ${expanded ? 'expanded' : ''}`}>
            {searchResults.map((result) => (
              <div key={result.title} className="search-result-item">
                <button onClick={() => handleGetArticle(result.title)}>
                  {result.title}
                </button>
              </div>
            ))}
          </div>
          {selectedArticle && (
            <div className="article-details focus">
              <h3>{selectedArticle.title}</h3>
              <p>{selectedArticle.summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LookupModal;
