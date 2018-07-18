import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import axios from 'axios';

class UserShow extends React.Component {

  constructor(){
    super();
    this.state = {
      user: {
        groups: [
        ]
      },
      currentUser: Auth.getCurrentUser()
    };
  }

  componentDidMount() {
    axios({
      url: `/api/users/${this.props.match.params.id}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ user: res.data  }));
  }

  componentWillReceiveProps(props) {
    axios({
      url: `/api/users/${props.match.params.id}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ user: res.data  }));
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
              {Auth.getPayload().sub !== this.state.user._id && <h1 className="title">{this.state.user.username}</h1>}
              {Auth.getPayload().sub === this.state.user._id && <h1 className="title">Hi  {this.state.user.username}</h1>}
            </div>
          </div>
        </section>

        <div className="groups-show-info">
          <section className="container groups-show-container">
            <div className="columns is-multiline">
              <div className="column is-one-third-desktop">
                <img className="user-show-image" src={this.state.user.image} alt={this.state.user.username} />
                {Auth.getPayload().sub === this.state.user._id && <div>
                  <Link to={`/users/${Auth.getPayload().sub}/edit`}>
                    <button className="button users-show-buttons">Edit</button>
                  </Link>
                  <button onClick={this.handleDelete} className="button users-show-buttons">Delete Account</button>
                </div>}
                <hr />
                {Auth.getPayload().sub === this.state.user._id && <h1 className="title">My Groups:</h1>}
                {Auth.getPayload().sub !== this.state.user._id && <h1 className="title">Groups:</h1>}
              </div>

              <div className="column is-two-thirds-desktop is-half-tablet is-mobile">
                {Auth.getPayload().sub !== this.state.user._id && <h2 className="subtitle">{this.state.user.username} belongs to {this.state.user.groups.length} group(s)</h2>}
                {Auth.getPayload().sub === this.state.user._id && <h2 className="subtitle">You belong to {this.state.user.groups.length} group(s)</h2>}
                {this.state.user.location && <h2 className="subtitle">Based in {this.state.user.location}</h2>}
                <div className="bio">
                  <p>{this.state.user.bio}</p>
                </div>
              </div>


              {this.state.user.groups.map(group =>
                <div  key={group._id} className="column is-one-third-desktop is-half-tablet is-mobile">
                  <div>
                    <div className="users-show-info">
                      <Link to={`/groups/${group._id}`}>
                        <img src={group.image} alt={group.groupName} />
                      </Link>
                      <h2 className="subtitle">{group.groupName}</h2>
                    </div>
                  </div>
                </div>
              )}

              {this.state.user.groupsCreated && this.state.user.groupsCreated.map(group =>
                <div  key={group._id} className="column is-one-third-desktop is-half-tablet is-mobile">
                  <div>
                    <div className="users-show-info">
                      <Link to={`/groups/${group._id}`}>
                        <img src={group.image} alt={group.groupName} />
                      </Link>
                      <h2 className="subtitle">{group.groupName}</h2>
                      <h2 className="subtitle"><strong>Creator</strong></h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

        </div>
      </main>
    );
  }
}

export default UserShow;
