import React from 'react';

const CommentBox = ({ data }) => {
  return(
    <section>
      {data.group.comments.map((comment, i) =>
        <article key={i} className="media">

          <figure className="media-left">
            <div className="image is-64x64">
              <img src={data.user.image} />
            </div>
          </figure>
          <div className="media-content">
            <div className="content">
              <div>
                <p><strong>{data.user.username}</strong></p>
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
