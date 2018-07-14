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
            </div>
          </div>
        </section>
        <div className="groups-show-info">
          <section className="container groups-show-container">
          <div className="columns is-multiline">
            <div className="column is-one-third-desktop">
                    <img src={this.state.user.image} alt={this.state.user.username} />
              <Link to={`/users/${Auth.getPayload().sub}/edit`}>
                <button className="button users-show-buttons">Edit</button>
              </Link>
              {Auth.isAuthenticated() && <button onClick={this.handleDelete} className="button users-show-buttons">Delete Account</button>}
              <hr />
              <h1 className="title">My Groups:</h1>
            </div>

            <div className="column is-two-thirds-desktop">
              <ul>
                <li>You belong to {this.state.user.groups.length} group(s)!</li>
                <a href="/groups">Browse groups</a>
                <li>{this.state.user.bio}</li>
              </ul>



            </div>

            <div className="columns">
            {this.state.user.groups.map(group =>
              <div  key={group._id} className="column is-half-desktop is-half-mobile">

                <div key={group._id}>
                  <div key={group._id} className="users-show-info">



                        <Link to={`/groups/${group._id}`}>
                          <img key={group._id} src={group.image} alt={group.groupName} />
                        </Link>
                        <h2 className="subtitle" key={group._id}>{group.groupName}</h2>




                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </section>

      </div>
      </main>
    );
  }
}

export default UserShow;
