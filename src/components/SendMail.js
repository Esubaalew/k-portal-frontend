import React, { useState } from 'react';
import '../styles/SendMail.css'; 

const SendMail = ({ isOpen, onClose, onSendEmail, userDetails }) => {
    const [emailSubject, setEmailSubject] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false); 
    const [isSending, setIsSending] = useState(false);

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSendEmail = async () => {
        if (emailSubject.trim() !== '' && emailContent.trim() !== '') {
            setIsSending(true); 
            try {
                await onSendEmail({ subject: emailSubject, content: emailContent, attachment });
                setIsSuccess(true);
            } catch (error) {
                console.error('Error sending email:', error);
               
            }
            setIsSending(false); 
        }
    };

    const handleModalClose = () => {
        // Reset states and close modal
        setEmailSubject('');
        setEmailContent('');
        setAttachment(null);
        setIsSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="send-mail-overlay">
            <div className="send-mail-modal">
                <div className="send-mail-header">
                    <h2>Send Email to {userDetails.username}</h2>
                    <button className="close-btn" onClick={handleModalClose}>✖</button>
                </div>
                <div className="send-mail-body">
                    {isSuccess ? (
                        <div className="success-message">Email sent successfully!</div>
                    ) : (
                        <>
                            <label>
                                Subject:
                                <input
                                    type="text"
                                    value={emailSubject}
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                />
                            </label>
                            <label>
                                Message:
                                <textarea
                                    rows="5"
                                    value={emailContent}
                                    onChange={(e) => setEmailContent(e.target.value)}
                                />
                            </label>
                            <label>
                                Attachment (optional):
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </label>
                            {isSending && <div className="spinner"></div>}
                        </>
                    )}
                </div>
                <div className="send-mail-footer">
                    {!isSuccess && (
                        <button onClick={handleSendEmail} className="send-btn">Send</button>
                    )}
                    <button onClick={handleModalClose} className="close-btn">Close</button>
                </div>
            </div>
        </div>
    );
};

export default SendMail;
