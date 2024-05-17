import React, { useState, useEffect } from 'react';
import ShareUI from './ShareUI';
import ResourceList from './ResourceList';
import ResourceByLang from './ResourceByLang';
import LanguageProportionsChart from './LanguageProportionsChart';
import { getAllResources } from '../API/resources';
import { getAllLanguages } from '../API/languages';
import '../styles/Feed.css';

const Feed = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const Token = JSON.parse(localStorage.getItem('user'));
        const accessToken = Token ? Token.access : null;
        const resourcesData = await getAllResources(accessToken);
        setResources(resourcesData);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languagesData = await getAllLanguages();
        setLanguages(languagesData);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="feed-container">
      <div className="feed-content">
        <ShareUI />
        <div className="filter-container">
          <label htmlFor="language-filter">Filter by Language:</label>
          <select id="language-filter" value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="">All</option>
            {languages.map((language) => (
              <option key={language.id} value={language.id}>{language.name}</option>
            ))}
          </select>
        </div>
        {selectedLanguage ? (
          <ResourceByLang languageId={selectedLanguage} />
        ) : (
          <ResourceList resources={resources} isLoading={isLoading} />
        )}
      </div>
      <LanguageProportionsChart selectedLanguage={selectedLanguage} />
    </div>
  );
};

export default Feed;
