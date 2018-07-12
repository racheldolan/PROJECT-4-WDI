import React from 'react';
import axios from 'axios';
import GroupsForm from './Form';
import Auth from '../../lib/Auth';

class GroupsEdit extends React.Component {

  constructor(){
    super();
    this.state = {
      errors: [{}]
    };
  }

  componentDidMount(){
    axios({
      url: `/api/groups/${this.props.match.params.id}`,
      method: 'GET'
    })
      .then(res => {
        console.log(res.data);
        this.setState(res.data);
      });
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `/api/groups/${this.props.match.params.id}`,
      method: 'PUT',
      data: this.state,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/groups'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render(){
    return(
      <GroupsForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        data={this.state}
      />
    );
  }
}

export default GroupsEdit;
