import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class AuthRegister extends React.Component {

  constructor(){
    super();
    this.state = {
      errors: {}
    };
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/api/register',
      method: 'POST',
      data: this.state
    })
      .then(res => {
        Auth.getToken(res.data.token);
        this.props.history.push('/login')
          .catch(err => this.setState({ errors: err.response.data.errors }));
      });
  }

  render(){
    console.log(this.state.errors);
    return(
      <div className="columns register-page">
        <div className="column">
          <section className="container register">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="username">Username</label>
                <input className="input" type="username" name="username" placeholder="Username" onChange={this.handleChange} />
              </div>
              <div className="field">
                <label className="email">Email</label>
                <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
              </div>
              <div className="field">
                <label className="password">Password</label>
                <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
              </div>
              <div className="field">
                <label className="passwordConfirmation">Password Confirmation</label>
                <input className="input" type="password" name="passwordConfirmation" placeholder="Password Confirmation"
                  onChange={this.handleChange} />
              </div>

              <button className="button register-button">Submit</button>
            </form>
          </section>
         </div>
      //   {/* <div className="column is-half-desktop">
      //     <img src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e274a5d7028b3221db5de6cf0b39db6c&auto=format&fit=crop&w=634&q=80" />
      //   </div> */}
       </div>

    );
  }
}

export default AuthRegister;
