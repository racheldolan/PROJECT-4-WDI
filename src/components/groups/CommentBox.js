import React from 'react';

const CommentBox = ({ data, handleCommentDelete }) => {
  return(
    <section>
      {data.group.comments.map((comment, i) =>
        <article key={i} className="media">

          <figure className="media-left">
            <div className="image is-64x64">
              <img src={comment.author.image} />
            </div>
          </figure>
          <div className="media-content">
            <div className="content">
              <div>
                <p><strong>{comment.author.username}</strong></p>
                <br />
                <p>{comment.content}</p>
              </div>
            </div>
          </div>
          <div className="media-right">
            <button onClick={() => handleCommentDelete(comment._id)} className="delete"></button>
          </div>
        </article>
      )}
    </section>
  );
};

export default CommentBox;
