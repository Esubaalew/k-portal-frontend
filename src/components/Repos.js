import React, { useState } from 'react';
import { searchGitHubRepos } from '../API/search';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSync, faCode } from '@fortawesome/free-solid-svg-icons';
import { TailSpin } from 'react-loader-spinner';
import NoResults from './NoResults';
import '../styles/Repos.css';

const Repos = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMade, setSearchMade] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user?.access;

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    const distance = formatDistanceToNow(date, { addSuffix: true });
    return distance;
  };

  const formatNumber = (number) => {
    if (number >= 1000 && number < 1000000) {
      return (number / 1000).toFixed(1) + 'K';
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else {
      return number.toString();
    }
  };

  const handleSearch = async () => {
    if (searchText.trim() !== '') {
      setLoading(true);
      setSearchMade(true);
      try {
        const results = await searchGitHubRepos(searchText, accessToken);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching GitHub repos:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="repos-container">
      <div className="search-containers">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search GitHub Repositories"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <div className="loading">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      ) : searchMade && searchResults.length === 0 ? (
        <NoResults />
      ) : (
        <div className="results">
          {searchResults.map((repo) => (
            <div key={repo.id} className="repo-item">
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <div className="details">
                {repo.language && (
                  <p>
                    <FontAwesomeIcon icon={faCode} title="Language" color='blue' />
                    {repo.language}
                  </p>
                )}
                {repo.stargazers_count && (
                  <p>
                    <FontAwesomeIcon icon={faStar} title="Stars" color='orange'/>
                    {formatNumber(repo.stargazers_count)}
                  </p>
                )}
                {repo.updated_at && (
                  <p>
                    <FontAwesomeIcon icon={faSync} title="Last Updated" color='brown' />
                    {formatDate(repo.updated_at)}
                  </p>
                )}
              </div>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Repos;
