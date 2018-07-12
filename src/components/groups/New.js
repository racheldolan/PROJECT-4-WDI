import React from 'react';
import axios from 'axios';
import GroupsForm from './Form';
import Auth from '../../lib/Auth';

class GroupsNew extends React.Component {

  constructor(){
    super();
    this.state = {
      errors: [{}]
    };
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/api/groups',
      method: 'POST',
      data: this.state,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })

      .then(() => this.props.history.push('/groups'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render(){
    return(
      <section className="container">
        <GroupsForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          data={this.state}
        />
      </section>
    );
  }
}

export default GroupsNew;
