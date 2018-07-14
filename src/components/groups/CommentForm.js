import React from 'react';

const CommentForm = ({ commentCreate, handleCommentChange }) => {
  return(
    <form onSubmit={commentCreate}>
      <label className="comment">Comment</label>
      <input className="input" onChange={handleCommentChange} />
      <button className="button">Post Comment</button>
    </form>
  );
};

export default CommentForm;
