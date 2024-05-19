// Modal.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Modal.css';

const Modal = ({ onClose, results, isLoading }) => {
  const handleOutsideClick = (e) => {
    if (e.target.className === 'modall large-modal') {
      onClose();
    }
  };

  return (
    <div className="modall large-modal" onClick={handleOutsideClick}>
      <div className="modall-content">
        {isLoading ? (
          <div className="loadingg-indicator">Loading...</div>
        ) : results.length > 0 ? (
          results.map(result => (
            <Link
              key={result.id}
              to={result.hasOwnProperty('username') ? `/user/${result.username}` : `/resource/${result.id}`}
              className="resultt-item-link"
            >
              <div className="resultt-item">
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
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
