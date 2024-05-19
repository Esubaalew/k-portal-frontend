import React, { useState, useEffect } from 'react';
import '../styles/LookupModal.css';
import { searchWikipedia, getWikipediaArticle } from '../API/wiki';

const LookupModal = ({ topic, onClose, showModal }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.access : null;

  useEffect(() => {
    setSearchResults([]);
  }, []);

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
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={`modal ${showModal ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Wikipedia Lookup</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <h3>Topic: {topic}</h3>
          <input
            type="text"
            placeholder="Search Wikipedia"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch} disabled={!query || loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          {error && <p className="error-message">{error}</p>}
          <ul>
            {searchResults.map((result) => (
              <li key={result.title}>
                <button onClick={() => handleGetArticle(result.title)}>{result.title}</button>
              </li>
            ))}
          </ul>
          {selectedArticle && (
            <div className="article-details">
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
