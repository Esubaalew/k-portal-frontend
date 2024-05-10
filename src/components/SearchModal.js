// Modal.js
import React from 'react';
import '../styles/Modal.css';

const Modal = ({ children, onClose }) => {
  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal large-modal') {
      onClose();
    }
  };

  return (
    <div className="modal large-modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;