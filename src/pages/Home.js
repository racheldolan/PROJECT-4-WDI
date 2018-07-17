import React from 'react';

// import Footer from '../components/common/Footer';

const Home = () => {
  return(
    <main className="home-page">
      <h1 className="home-title">Chapter</h1>
      <h2 className="home-subtitle">Expand your library and your friendships</h2>
      <a href="/groups" className="button home-button">Browse Groups</a>
      <a href="/login" className="button home-button">Login</a>
      {/* <Footer></Footer> */}
    </main>
  );
};

export default Home;
