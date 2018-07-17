import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

const CommentBox = ({ data, handleCommentDelete }) => {
  return(
    <section className="comment-box">
      {data.group.comments.map((comment, i) =>
        <article key={i} className="media">

          <figure className="media-left">
            <div className="image is-64x64">
              <Link to={`/users/${comment.author._id}`}>
                <img src={comment.author.image} />
              </Link>
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
            {Auth.getPayload().sub === comment.author._id && <button onClick={() => handleCommentDelete(comment._id)} className="delete"></button>}
          </div>
        </article>
      )}
    </section>
  );
};

export default CommentBox;
