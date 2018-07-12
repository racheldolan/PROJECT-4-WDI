import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import axios from 'axios';

class UserShow extends React.Component {

  constructor(){
    super();
    this.state = {
      user: {
        groups: []
      }
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
      <main className="user-show">
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
          <div className="columns is-multiline">
            <div className="column is-one-third-desktop">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by4">
                    <img src={this.state.user.image} alt={this.state.user.username} />
                  </figure>
                </div>
              </div>
              <Link to={`/users/${Auth.getPayload().sub}/edit`}>
                <button className="button">Edit</button>
              </Link>
              {Auth.isAuthenticated() && <button onClick={this.handleDelete}className="button">Delete Account</button>}
              <hr />
              <h1 className="title">My Groups:</h1>
            </div>

            <div className="column is-two-thirds-desktop">
              <div className="media">
                <p>{this.state.user.bio}</p>
              </div>
            </div>

            {this.state.user.groups.map(group =>
              <div  key={group._id} className="column is-one-third-desktop">

                <div key={group._id} className="card">
                  <div className="card-image">
                    <figure className="image is-4by4">

                      <div key={group._id}>
                        <Link to={`/groups/${group._id}`}>
                          <img key={group._id} src={group.image} alt={group.groupName} />
                        </Link>
                        <h2 className="subtitle" key={group._id}>{group.groupName}</h2>
                      </div>

                    </figure>

                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </main>
    );
  }
}

export default UserShow;
