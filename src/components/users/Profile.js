import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import axios from 'axios';

class Profile extends React.Component{


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
      url: '/api/profile',
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ user: res.data }, () => console.log(this.state)));
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
      console.log(this.state);
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
            {this.state.user && <section className="container groups-show-container">
              <div className="columns is-multiline">
                <div className="column is-one-third-desktop">
                  <img src={this.state.user.image} alt={this.state.user.username} />
                  <div>
                    <Link to={`/users/${Auth.getPayload().sub}/edit`}>
                      <button className="button users-show-buttons">Edit</button>
                    </Link>
                    <button onClick={this.handleDelete} className="button users-show-buttons">Delete Account</button>
                  </div>
                  <hr />
                  <h1 className="title">My Groups:</h1>
                </div>

                <div className="column is-two-thirds-desktop">
                  <ul>
                    <li>You belong to {this.state.user.groups.length} group(s)</li>
                  </ul>

                  <div className="bio">
                    <p>{this.state.user.bio}</p>
                  </div>

                </div>

                {/* <div className="columns"> */}
                {this.state.user.groups.map(group =>
                  <div  key={group._id} className="column is-one-third-desktop is-half-mobile">
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
                {/* </div> */}
              </div>
            </section>}

          </div>
        </main>

      );
    }


}

export default Profile;