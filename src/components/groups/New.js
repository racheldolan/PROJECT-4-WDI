import React from 'react';
import axios from 'axios';

class GroupsNew extends React.Component {

  constructor(){
    super();
    this.state = {};
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/api/groups',
      method: 'POST',
      data: this.state
    })
      .then(() => this.props.history.push('/groups'));
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="groupName">Group Name</label>
          <input className="input" type="groupName" name="groupName" placeholder="Group Name" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="info">Group Info</label>
          <textarea className="input" name="info" placeholder="Group Info" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="label">Group Privacy</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select name="public" onChange={this.handleChange}>
                <option value="" disabled>Please choose</option>
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div>
        </div>

        <button className="button">Submit Group</button>
      </form>
    );
  }
}

export default GroupsNew;
