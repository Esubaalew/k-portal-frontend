import React  from 'react';
import '../styles/Modal.css';

const Modal = ({ children}) => {
   

  return (
    <div className="modal large-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
