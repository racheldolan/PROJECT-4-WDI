import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class AuthRegister extends React.Component {

  state = {}

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/api/register',
      method: 'POST',
      data: this.state
    })
      .then(res => {
        Auth.getToken(res.data.token);
        this.props.history.push('/');
      });
      
  }

  render(){
    return(
      <form>
        <div className="field">
          <label className="username">Username</label>
          <input className="input" type="username" name="username" placeholder="Username"  />
        </div>
        <div className="field">
          <label className="email">Email</label>
          <input className="input" name="email" placeholder="Email"  />
        </div>
        <div className="field">
          <label className="password">Password</label>
          <input className="input" type="password" name="password" placeholder="Password" />
        </div>
        <div className="field">
          <label className="passwordConfirmation">Password Confirmation</label>
          <input className="input" type="password" name="passwordConfirmation" placeholder="Password Confirmation" />
        </div>

        <button className="button">Submit</button>
      </form>
    );
  }
}

export default AuthRegister;
