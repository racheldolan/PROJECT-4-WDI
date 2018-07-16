import React from 'react';

const CommentBox = ({ data }) => {
  return(
    <section>
      {data.group.comments.map((comment, i) =>
        <article key={i} className="media">

          <figure className="media-left">
            <img src={data.user.image} />
          </figure>
          <div className="media-content">
            <div className="content">
              <div>
                <strong>{data.user.username}</strong>
                <br />
                <p>{comment.content}</p>
              </div>
            </div>
          </div>
          <div className="media-right">
            <button className="delete"></button>
          </div>
        </article>
      )}
    </section>
  );
};

export default CommentBox;
