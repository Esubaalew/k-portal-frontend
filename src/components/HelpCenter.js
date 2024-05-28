import React, { useState, useEffect } from 'react';
import '../styles/HelpCenter.css';
import questionsData from '../questions.json';
import Header from './Header';
import Footer from './Footer';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedCategory) {
      const categoryQuestions = questionsData.find(
        (cat) => cat.category === selectedCategory
      );
      const questions = categoryQuestions ? categoryQuestions.questions : [];
      if (searchTerm) {
        setFilteredQuestions(questions.filter(
          (q) =>
            q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      } else {
        setFilteredQuestions(questions);
      }
    } else if (searchTerm) {
      const allQuestions = questionsData.flatMap(cat => cat.questions);
      setFilteredQuestions(allQuestions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredQuestions([]);
    }
  }, [selectedCategory, searchTerm]);

  return (
    <>
    <Header />
    <div className="help-center">
      <div className="sidebar">
        <ul>
          {questionsData.map((category, index) => (
            <li key={index} onClick={() => handleCategoryClick(category.category)}>
              {category.category}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <h1>How can we help you?</h1>
        <input
          type="text"
          placeholder="Search help articles..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="popular-topics">
          <div className="topic-card" onClick={() => handleCategoryClick('Using the App')}>Using the App</div>
          <div className="topic-card" onClick={() => handleCategoryClick('Managing Your Account')}>Managing Your Account</div>
          <div className="topic-card" onClick={() => handleCategoryClick('Privacy, Safety, and Security')}>Privacy, Safety, and Security</div>
          <div className="topic-card" onClick={() => handleCategoryClick('Policies and Reporting')}>Policies and Reporting</div>
        </div>
        <div className="questions-list">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => (
              <div key={index} className="question-item">
                <h3>{question.question}</h3>
                <p>{question.answer}</p>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
<Footer />
    </>
  );
};

export default HelpCenter;
