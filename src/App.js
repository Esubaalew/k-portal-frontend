import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faFile, faImage } from '@fortawesome/free-solid-svg-icons';

const KnowledgeSharingComponent = () => {
  const [shareType, setShareType] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [largeInputVisible, setLargeInputVisible] = useState(false);

  const handleShareTypeChange = (event, type) => {
    if (type === shareType) {
      // If the clicked share type is already selected, toggle large input visibility
      setLargeInputVisible(!largeInputVisible);
    } else {
      // If a new share type is selected, set it and hide large input
      setShareType(type);
      // Only hide the large input if the clicked share type is different from the current one
      if (largeInputVisible) {
        setLargeInputVisible(false);
      }
      // Clear caption when share type changes
      setCaption('');
      // Clear other input fields
      setLink('');
      setFile(null);
      setPhoto(null);
    }
  };
  

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleCaptionClick = () => {
    setLargeInputVisible(true);
  };

  const renderShareTypeItem = (type, icon, label) => {
    return (
      <div
        key={type}
        style={{
          display: 'inline-block',
          padding: '10px',
          borderBottom: shareType === type ? '2px solid #007bff' : 'none',
          cursor: 'pointer',
        }}
        onClick={(event) => handleShareTypeChange(event, type)}
      >
        <FontAwesomeIcon icon={icon} style={{ marginRight: '5px' }} />
        {label}
      </div>
    );
  };

  const shareTypeItems = [
    { type: 'link', icon: faLink, label: 'Link' },
    { type: 'file', icon: faFile, label: 'File' },
    { type: 'photo', icon: faImage, label: 'Photo' },
  ];

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#007bff' }}>Share Knowledge</h2>
      <div style={{ marginBottom: '20px' }}>
        {/* Render share type items above input field */}
        {shareTypeItems.map((item) => renderShareTypeItem(item.type, item.icon, item.label))}
      </div>
      {shareType && (
        <div style={{ marginBottom: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
          {shareType === 'link' && (
            <div>
             
              <FontAwesomeIcon icon={faLink} style={{ fontSize: '24px', marginRight: '5px' ,color: '#007bff'  }} />
              <input type="text" value={link} onChange={handleLinkChange} placeholder="Type the link or URL" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '20px' }} />
            </div>
          )}
          {shareType === 'file' && (
  <div>
    
    <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faFile} style={{ fontSize: '24px', marginRight: '5px' ,color: '#007bff'}} />
      Upload File
    </label>
    <input id="fileInput" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
  </div>
)}

{shareType === 'photo' && (
  <div>

    <label htmlFor="photoInput" style={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faImage} style={{ fontSize: '24px', marginRight: '5px' ,color: '#007bff'  }} />
      Upload Photo
    </label>
    <input id="photoInput" type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
  </div>
)}

        </div>
      )}
      {!largeInputVisible && shareType && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}></label>
          <input
            value={caption}
            onClick={handleCaptionClick}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Type here"
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '20px' }}
          />
        </div>
      )}
      {largeInputVisible && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}></label>
          <textarea
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Type here"
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '20px', minHeight: '200px' }}
          />
        </div>
      )}
      <button
        style={{
          display: 'block',
          width: '100%',
          padding: '15px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Share
      </button>
    </div>
  );
};

export default KnowledgeSharingComponent;
