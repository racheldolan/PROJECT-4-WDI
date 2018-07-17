import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class UserEdit extends React.Component {

  state = {}

  componentDidMount(){
    axios({
      url: `/api/users/${this.props.match.params.id}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        this.setState(res.data);
      });
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `/api/users/${this.props.match.params.id}`,
      method: 'PUT',
      data: this.state
    })
      .then(() => this.props.history.push(`/users/${this.props.match.params.id}`));
  }

  render(){
    console.log(this.state);
    return(
      <div className="columns form-page">
        <div className="column user-edit">
          <section className="container form-section">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="username">Username</label>
                <input className="input" type="username" name="username" placeholder="Username" onChange={this.handleChange}
                  value={this.state.username || ''} />
              </div>
              <div className="field">
                <label className="email">Email</label>
                <input className="input" name="email" placeholder="Email" onChange={this.handleChange}
                  value={this.state.email || ''} />
              </div>
              <div className="field">
                <label className="image">Image</label>
                <input className="input" name="image" placeholder="Image" onChange={this.handleChange}
                  value={this.state.image || ''}/>
              </div>
              <div className="field">
                <label className="bio">Bio</label>
                <textarea className="input" type="bio" name="bio" placeholder="Bio" onChange={this.handleChange}
                  value={this.state.bio || ''} />
              </div>
              <div className="field">
                <label className="location">Location</label>
                <textarea className="input" type="location" name="location" placeholder="Location" onChange={this.handleChange}
                  value={this.state.location || ''} />
              </div>

              <button className="button">Submit</button>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default UserEdit;
