import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class AuthLogin extends React.Component {

  state = {}

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/api/login',
      method: 'POST',
      data: this.state
    })
      .then(res => {
        Auth.setToken(res.data.token);
        Auth.setCurrentUser(res.data.user);
        this.props.history.push('/');
      })
      .catch(() => {
        Flash.setMessage('danger', 'Invalid credentials');
        this.props.history.replace('/login');
      });
  }

  render(){
    return(
      <div className="columns login-page">
        <div className="column">
          <section className="container login">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="email">Email</label>
                <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
              </div>
              <div className="field">
                <label className="password">Password</label>
                <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
              </div>

              <button className="button login-button">Submit</button>
            </form>
          </section>
        </div>
        <div className="column">
          <img className="login-image" src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e274a5d7028b3221db5de6cf0b39db6c&auto=format&fit=crop&w=634&q=80" />
        </div>
      </div>
    );
  }
}

export default AuthLogin;
