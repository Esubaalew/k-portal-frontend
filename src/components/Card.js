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
      'Go': '#00ADD8',
      'Rust': '#000000',
      'R': '#276DC3',
      'Scala': '#DC322F',
      'Perl': '#39457E',
      'Haskell': '#5E5086',
      'Lua': '#000080',
      'Shell': '#89E051',
      'PowerShell': '#012456',
      'Assembly': '#6E4C13',
      'Dart': '#00B4AB',
      'Elixir': '#6e4a7e',
      'Clojure': '#5881d8',
      'Objective-C': '#438eff',
      'COBOL': '#555555',
      'Lua': '#000080',
      'Perl': '#39457E',
      "Prolog": "#74283c",
      "Scheme": "#1e4aec",
      "Smalltalk": "#596706",
      'Erlang': '#A90533',
      'Ada': '#02f88c',
      'Lisp': '#3fb68b',
      "Visual Basic": "#945db7",

      

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