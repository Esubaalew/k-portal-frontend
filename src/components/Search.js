// Search.js
import React, { useState, useEffect } from 'react';
import Modal from './SearchModal';
import { searchUsers, searchResources } from '../API/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user?.access;

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowModal(query.trim() !== ''); // Show modal if query is not empty
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim() !== '') {
        setIsLoading(true);
        try {
          const userResults = await searchUsers(searchQuery, accessToken);
          const resourceResults = await searchResources(searchQuery, accessToken);
          setSearchResults([...userResults, ...resourceResults]);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
        setIsLoading(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, accessToken]);

  const closeModal = () => {
    setSearchQuery('');
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
        <Modal onClose={closeModal} results={searchResults} isLoading={isLoading} />
      )}
    </div>
  );
};

export default Search;
