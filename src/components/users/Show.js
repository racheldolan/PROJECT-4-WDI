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
      currentUser: {}
    };
  }

  componentDidMount() {
    axios({
      url: `/api/users/${this.props.match.params.id}`,
      method: 'GET'
    })
      .then(res => this.setState({ user: res.data, currentUser: Auth.getCurrentUser() }));
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
    console.log(this.state.user.groups);

    return(
      <main className="user-show">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              {this.state.user._id === this.state.currentUser._id && <h1 className="title">
                Hi  {this.state.user.username}
              </h1>}
              {this.state.user._id !== this.state.currentUser._id &&  <h1 className="title">{this.state.user.username}</h1>}
            </div>
          </div>
        </section>
        <div className="groups-show-info">
          <section className="container groups-show-container">
            <div className="columns is-multiline">
              <div className="column is-one-third-desktop">
                <img src={this.state.user.image} alt={this.state.user.username} />
                {this.state.user._id === this.state.currentUser._id &&  <div>
                  <Link to={`/users/${Auth.getPayload().sub}/edit`}>
                    <button className="button users-show-buttons">Edit</button>
                  </Link>
                  <button onClick={this.handleDelete} className="button users-show-buttons">Delete Account</button>
                </div>}
                <hr />
                {this.state.user._id === this.state.currentUser._id && <h1 className="title">My Groups:</h1>}
                {this.state.user._id !== this.state.currentUser._id && <h1 className="title">Groups:</h1>}
              </div>

              <div className="column is-two-thirds-desktop">
                <ul>
                  {this.state.user._id === this.state.currentUser._id && <li>You belong to {this.state.user.groups.length} group(s)!</li>}
                  {this.state.user._id !== this.state.currentUser._id && <li>{this.state.user.username} belongs to {this.state.user.groups.length} group(s)</li>}
                </ul>

                  <div className="bio">
                    <p>{this.state.user.bio}</p>
                  </div>




              </div>

              {/* <div className="columns"> */}
                {this.state.user.groups.map((group, i) =>
                  <div  key={group._id} className="column is-one-third-desktop is-half-mobile">

                    <div key={group._id}>
                      <div key={group._id} className="users-show-info">


                        <Link to={`/groups/${group._id}`}>
                          <img key={group._id} src={group.image} alt={group.groupName} />
                        </Link>
                        <h2 className="subtitle" key={i}>{group.groupName}</h2>




                  </div>
                </div>
              </div>
            )}
          {/* </div> */}
          </div>
        </section>

      </div>
      </main>
    );
  }
}

export default UserShow;
