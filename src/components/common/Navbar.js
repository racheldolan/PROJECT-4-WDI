import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

class Navbar extends React.Component {

  state = {
    navbarOpen: false
  };

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false });
    }
  }

  logout = () => {
    Auth.logout();
    this.props.history.push('/');
  }


  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img src="../../assets/images/logo.png" />
          </Link>

          <a role="button"
            className={`navbar-burger${this.state.navbarOpen ? ' is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={this.toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu${this.state.navbarOpen ? ' is-active' : ''}`}>
          <div className="navbar-start">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/groups" className="navbar-item">Browse Groups</Link>
            {Auth.isAuthenticated() && <Link to="/groups/new" className="navbar-item">New Group</Link>}
          </div>
          <div className="navbar-end">
            {Auth.isAuthenticated() && <Link to={`/users/${Auth.getPayload().sub}`} className="navbar-item">My Profile</Link>}
            {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">Login</Link>}
            {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}
            {Auth.isAuthenticated() && <Link to="/" onClick={this.logout} className="navbar-item">Logout</Link>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
