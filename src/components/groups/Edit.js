import React from 'react';
import axios from 'axios';
import GroupsForm from '../common/Form';

class GroupsEdit extends React.Component {

  state = {};

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
      data: this.state
    })
      .then(() => this.props.history.push('/groups'));
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
