import React from 'react';
import  '../styles/DownloadModal.css';

const DownloadModal = ({ isOpen, onClose, fileUrl }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose(); 
  };

  return (
    <div className="modall-overlay">
      <div className="modal-contentt">
        <h3>Download File</h3>
        <p>Are you sure you want to download this file?</p>
        <button onClick={handleDownload} className="downloadd-button">Download</button>
        <button onClick={onClose} className="closee-button">Cancel</button>
      </div>
    </div>
  );
};

export default DownloadModal;
