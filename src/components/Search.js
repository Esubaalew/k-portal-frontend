// Search.js
import React, { useState, useEffect } from 'react';
import Modal from './SearchModal'; 
import { searchUsers } from '../API/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user?.access;

  const handleChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim() !== '') {
        try {
          const results = await searchUsers(searchQuery, accessToken);
          setSearchResults(results);
          setShowModal(true);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults([]);
        setShowModal(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, accessToken]);

  const handleClickResult = (resultId) => {
    // Navigate to detail page for the selected result
    // You can use React Router's useHistory hook or withRouter HOC for this
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleChange}
          className="search-input" 
          placeholder="Enter search query" 
        />
        <div className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      
      {showModal && (
  <Modal onClose={closeModal}>
    <div className="search-results">
      {searchResults.length > 0 ? (
        searchResults.map(result => (
          <div key={result.id} onClick={() => handleClickResult(result.id)} className="result-item">
            <div className="user-icon">{result.first_name[0]}{result.last_name[0]}</div>
            <div className="user-info">
              <div className="user-name">{result.first_name} {result.last_name}</div>
              <div className="user-username">@{result.username}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">
          No results found.
        </div>
      )}
    </div>
  </Modal>
)}

    </div>
  );
};

export default Search;