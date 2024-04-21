import React from 'react';
import '../styles/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

function Card({ name, shorty, subtitle, description })  {
    const colorMap = {
      'JavaScript': '#f0db4f',
      'Python': '#4B8BBE',    
      'C++': '#00599C',    
      'Java': '#5382A1',
      'Ruby': '#CC342D',
      'C#': '#68217A',
      'PHP': '#777BB4',
      'Swift': '#FA7343',
      'Kotlin': '#0095D5',
      'TypeScript': '#007ACC' ,
    'Go': '#00ADD8'
    };
    return (
        <div className="Card">
          <div className="card-header">
            <FontAwesomeIcon icon={faCode} className="icon" style={{ color: colorMap[name] }} />
            <div className="language-info">
              <h2>{name}</h2>
              <p className="shorty">{shorty}</p>
            </div>
          </div>
          <p className="card-description">{description}</p>
          <div className="learn-more-container">
            <button className="learn-more">Learn More</button>
          </div>
        </div>
      );
    }
    
    export default Card;