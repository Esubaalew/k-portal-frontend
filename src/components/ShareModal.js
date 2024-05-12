import React, { useState, useEffect } from 'react';
import '../styles/ShareModal.css';
import { addResource } from '../API/resources';
import { getAllLanguages } from '../API/languages'; // Import the getAllLanguages function
import { getLoggedInUser } from '../API/auth';
import { InfinitySpin } from 'react-loader-spinner';

const ShareModal = ({ onClose, onPost }) => {
  const [content, setContent] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('link');
  const [linkURL, setLinkURL] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState(null); // State for selected language
  const [topic, setTopic] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState([]); // State to store the list of languages
  const Token = JSON.parse(localStorage.getItem('user'));
  const accessToken = Token ? Token.access : null;

  // Fetch the list of languages when the component mounts
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const Token = JSON.parse(localStorage.getItem('user'));
      const accessToken = Token ? Token.access : null;
      const user = await getLoggedInUser(accessToken);
      setLoggedInUser(user);
    };

    fetchLoggedInUser();

    const fetchLanguages = async () => {
      try {
        const languages = await getAllLanguages();
        // Set the initial value of the language dropdown to the first language in the list
        if (languages.length > 0) {
          setLanguage(languages[1]); 
        }
        setLanguages(languages); // Set the fetched languages in the state
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleFormatSelect = (format) => {
    if (format !== 'link') setLinkURL('');
    if (format !== 'image') setImageFile(null);
    if (format !== 'file') setFile(null);
    setSelectedFormat(format);
  };

  const handleLinkChange = (event) => {
    setLinkURL(event.target.value);
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (selectedFormat === 'image') {
      setImageFile(newFile);
    } else if (selectedFormat === 'file') {
      setFile(newFile);
    }
  };
  

  const handlePost = async () => {
    if (!content || !language || !topic || (selectedFormat === 'link' && !linkURL) || (selectedFormat === 'image' && !imageFile) || (selectedFormat === 'file' && !file)) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      if (!loggedInUser) {
        console.log("Waiting for user to be logged in...");
        return;
      }

      const formData = new FormData();
      formData.append('content', content);
      formData.append('language', language.id);
      formData.append('language_name', language.name);
      formData.append('caption', content);
      formData.append('topic', topic);
      formData.append('owner', loggedInUser.id);

      if (selectedFormat === 'link') {
        formData.append('url', linkURL);
      } else if (selectedFormat === 'image') {
        formData.append('photo', imageFile);
      } else if (selectedFormat === 'file') {
        formData.append('file', file);
      }

      await addResource(formData, accessToken);
      setSuccessMessage('Resource posted successfully!');
      onPost();
    } catch (error) {
      console.error('Error posting resource:', error);
      alert('Failed to post resource. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage(''); // Clear the success message
    onClose(); // Close the modal
  };

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="share-modal-header">
          Share Knowledge
        </div>
        <hr className="share-modal-separator" />
        {loading ? (
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        ) : successMessage ? (
          <>
            <div className="success-message">{successMessage}</div>
            <button className="ok-button" onClick={handleCloseSuccessMessage}>OK</button>
          </>
        ) : (
          <>
            <div className="caption-box">
              <textarea
                className="share-modal-input"
                placeholder="Share something?"
                value={content}
                onChange={handleInputChange}
              ></textarea>
             <select
  className="share-modal-select"
  value={language ? language.id : ''}
  onChange={(e) => setLanguage(languages.find(lang => lang.id === parseInt(e.target.value)))}
>
  {languages.map((lang) => (
    <option key={lang.id} value={lang.id}>{lang.name}</option>
  ))}
</select>



              <input
                type="text"
                className="share-modal-text-input"
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            {selectedFormat === 'link' && (
              <input
                type="text"
                className="share-modal-link-input"
                placeholder="Enter link URL"
                value={linkURL}
                onChange={handleLinkChange}
              />
            )}
            {selectedFormat === 'image' && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  className="share-modal-file-input"
                  onChange={handleFileChange}
                />
                {imageFile && (
                  <img src={URL.createObjectURL(imageFile)} alt="Preview" className="image-preview" />
                )}
              </>
            )}
            {selectedFormat === 'file' && (
              <input
                type="file"
                className="share-modal-file-input"
                onChange={handleFileChange}
              />
            )}
            <div className="button-container">
              <div className="format-card">
                <button
                  className={`format-button ${selectedFormat === 'link' ? 'selected' : ''}`}
                  onClick={() => handleFormatSelect('link')}
                >
                  <i className="fas fa-link"></i>
                </button>
                <button
                  className={`format-button ${selectedFormat === 'image' ? 'selected' : ''}`}
                  onClick={() => handleFormatSelect('image')}
                >
                  <i className="fas fa-image"></i>
                </button>
                <button
                  className={`format-button ${selectedFormat === 'file' ? 'selected' : ''}`}
                  onClick={() => handleFormatSelect('file')}
                >
                  <i className="fas fa-file"></i>
                </button>
              </div>
              <button className="share-modal-button" onClick={handlePost}>Post</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
