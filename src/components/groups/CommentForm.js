import React from 'react';

const CommentForm = ({ commentCreate, handleCommentChange, data }) => {
  return(
    <form onSubmit={commentCreate}>
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            {data.user && <img src={data.user.image} />}
          </p>
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <input className="textarea" placeholder="Add a comment..." onChange={handleCommentChange}></input>
            </p>
          </div>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <button className="button groups-show-buttons">Submit</button>
              </div>
            </div>
          </nav>
        </div>
      </article>
    </form>
  );
};

export default CommentForm;
