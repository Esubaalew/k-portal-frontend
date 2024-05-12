import React, { useState, useEffect } from 'react';
import Card from './Card';
import '../styles/Main.css';
import { getAllLanguages } from '../API/languages';
import { Audio } from 'react-loader-spinner'; // Import the Audio spinner

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
        // Display the spinner during loading
        <div className="loading-spinner">
          <Audio height={80} width={80} radius={9} color="green" ariaLabel="loading" />
        </div>
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
