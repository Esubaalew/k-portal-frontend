import React, { useState, useEffect } from 'react';
import Card from './Card';
import '../styles/Main.css';
import { getAllLanguages } from '../API/languages';

function MainContent() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
       
        const fetchedLanguages = await getAllLanguages();
        setLanguages(fetchedLanguages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching languages:', error.message);
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <main className="MainContent">
      {loading ? (
        <p>Loading...</p> // Display a loading message or spinner while loading
      ) : (
        languages.map((language, index) => (
          <Card 
            key={index} 
            name={language.name} 
            shorty={language.shorty} 
            description={language.description} 
          />
        ))
      )}
    </main>
  );
}

export default MainContent;
