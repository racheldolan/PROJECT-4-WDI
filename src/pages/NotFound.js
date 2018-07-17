import React from 'react';
// import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1 className="title">404: We can&apos;t find what you&apos;re looking for!</h1>
      {/* <Link to="/" */}
      <a href="/"><h2 className="subtitle">Back to Home</h2></a>
    </div>
  );
};

export default NotFound;
