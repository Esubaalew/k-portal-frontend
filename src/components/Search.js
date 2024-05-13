import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Modal from './SearchModal';
import { searchUsers, searchResources } from '../API/search';
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
    setShowModal(query.trim() !== ''); // Show modal if query is not empty
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim() !== '') {
        try {
          const userResults = await searchUsers(searchQuery, accessToken);
          const resourceResults = await searchResources(searchQuery, accessToken);
          setSearchResults([...userResults, ...resourceResults]);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
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
        <Modal onClose={closeModal}>
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map(result => (
                <Link
                  key={result.id}
                  to={result.hasOwnProperty('username') ? `/user/${result.username}` : `/resource/${result.id}`}
                  className="result-item-link"
                >
                   <div
                    className="result-item"
                  ></div>
                  {result.hasOwnProperty('username') ? (
                    <>
                      <div className="user-icon">
                        {result.first_name[0]}
                        {result.last_name[0]}
                      </div>
                      <div className="user-info">
                        <div className="user-name">
                          {result.first_name} {result.last_name}
                        </div>
                        <div className="user-username">
                          @{result.username}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="resource-info">
                      <div className="resource-caption">
                        {result.caption.length > 50 ? `${result.caption.substring(0, 50)}...` : result.caption}
                      </div>
                      <div className="resource-topic">
                        {result.topic}
                      </div>
                      <div className="resource-language">
                        {result.language_name}
                      </div>
                    </div>
                  )}
                </Link>
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
