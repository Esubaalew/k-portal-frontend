import React from 'react';
import '../styles/LikeCommentButtons.css';

const LikeCommentButtons = ({ likesCount, commentsCount, onLike, onComment, isLiked }) => {
  return (
    <div className="like-comment-buttons">
      <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={onLike}>
        <i className="fas fa-thumbs-up icon"></i>
        <span className="count">{likesCount}</span>
      </button>
      <button className="comment-button" onClick={onComment}>
        <i className="fas fa-comments icon"></i>
        <span className="count">{commentsCount}</span>
      </button>
    </div>
  );
};

export default LikeCommentButtons;
