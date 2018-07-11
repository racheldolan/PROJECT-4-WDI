import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import axios from 'axios';

class UserShow extends React.Component {

  constructor(){
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios({
      url: `/api/users/${this.props.match.params.id}`,
      method: 'GET'
    })
      .then(res => this.setState({ user: res.data }));
  }

  handleDelete = () => {
    axios({
      url: `/api/users/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      .then(Auth.logout())
      .then(() => this.props.history.push('/'));
  }

  render(){
    return(
      <main>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Hi  {this.state.user.username}
              </h1>
              <h2 className="subtitle">
                Hero subtitle
              </h2>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="columns">
            <div className="column is-one-third-desktop">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={this.state.user.image} alt={this.state.user.username} />
                  </figure>
                </div>
              </div>
            </div>

            <div className="column is-half-desktop">
              <div className="media">
                <p>{this.state.user.bio}</p>
                <Link to={`/users/${Auth.getPayload().sub}/edit`}>
                  <button className="button">Edit</button>
                </Link>
                {Auth.isAuthenticated() && <button onClick={this.handleDelete}className="button">Delete</button>}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default UserShow;
