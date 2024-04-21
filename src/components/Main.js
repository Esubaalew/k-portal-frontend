import React from 'react';
import Card from './Card';
import '../styles/Main.css';

function MainContent() {
  const languages = [
    { 
      name: 'JavaScript', 
      shorty: 'The scripting standard for webpages.', // Add a shorty for each language
      description: 'JavaScript is a popular programming language that is primarily used for building interactive web applications.' 
    },
    { 
      name: 'Python', 
      shorty: 'The language of simplicity and power.', 
      description: 'Python is a versatile and beginner-friendly programming language known for its readability and extensive libraries.' 
    },
    { 
      name: 'C++', 
      shorty: 'The language of systems and games.', 
      description: 'C++ is a high-performance programming language used to build complex systems and video games.' 
    },
    {
        name: 'Java',
        shorty: 'The language of enterprise applications.',
        description: 'Java is a popular programming language used to build large-scale enterprise applications.'
    },
    {
        name: 'Ruby',
        shorty: 'The language of elegance and simplicity.',
        description: 'Ruby is a dynamic programming language known for its simplicity and productivity.'
    },
    {
        name: 'C#',
        shorty: 'The language of Microsoft.',
        description: 'C# is a versatile programming language developed by Microsoft for building Windows applications.'
    },
    {
        name: 'PHP',
        shorty: 'The language of server-side scripting.',
        description: 'PHP is a server-side scripting language used to build dynamic web applications.'
    },
    {
        name: 'Swift',
        shorty: 'The language of Apple.',
        description: 'Swift is a powerful programming language developed by Apple for building iOS and macOS applications.'
    },
    {
        name: 'Kotlin',
        shorty: 'The language of Android.',
        description: 'Kotlin is a modern programming language used to build Android applications.'
    },
   
  ];

  return (
    <main className="MainContent">
      {languages.map((language, index) => (
        <Card 
          key={index} 
          name={language.name} 
          shorty={language.shorty} 
          description={language.description} 
        />
      ))}
    </main>
  );
}

export default MainContent;
