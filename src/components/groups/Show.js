import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Base64  from '../common/Base64';

class GroupsShow extends React.Component {

  constructor(){
    super();
    this.state = {
      user: {},
      group: {
        members: []
      },
      books: []
    };
  }

  componentDidMount() {
    axios({
      url: `/api/groups/${this.props.match.params.id}`,
      method: 'GET'
    })
      .then(res => this.setState({ group: res.data }));

    axios({
      url: `/api/users/${Auth.getPayload().sub}`,
      method: 'GET'
    })
      .then(res => this.setState({ user: res.data }));
  }

  handleDelete = () => {
    axios({
      url: `/api/groups/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => this.props.history.push('/groups'));
  }

  addToUser(){
    axios({
      url: `/api/groups/${this.props.match.params.id}/users`,
      method: 'PUT',
      data: this.state.user,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    });
  }

  removeFromGroup = (group) => {
    const index = this.state.user.groups.indexOf(group);
    this.state.user.groups.splice(index, 1);
    axios({
      method: 'PUT',
      url: `/api/groups/${this.props.match.params.id}/users/delete`,
      data: this.state.user
    })
      .then(() => this.props.history.push('/groups'));
  }


  addToGroup = (e) => {
    e.preventDefault();
    this.addToUser();
    axios({
      url: `/api/users/${Auth.getPayload().sub}/groups`,
      method: 'PUT',
      data: this.state.group,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      // .then(res => this.setState({ groups: res.data }))
      .then(() => this.props.history.push('/groups'));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/api/vision',
      data: this.state
    })
      .then(res => this.setState({ books: res.data}));
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios({
  //     method: 'POST',
  //     url: `/api/groups/${this.props.match.params.id}`,
  //     data: this.state
  //   })
  //     .then(() => this.props.history.push(`/groups/${this.props.match.params.id}`));
  // }


  render(){
    console.log(this.state.group.members);
    return(
      <main>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {this.state.group.groupName}
              </h1>
              <h2 className="subtitle">
                {this.state.books.map(book =>
                  <ul key={book._id}>
                    <li key={book}>
                      <a href={book.url} key={book.url}>{book.url}</a>
                    </li>
                  </ul>
                )}
                Hero subtitle
              </h2>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="columns">
            <div className="column is-one-third-desktop">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={this.state.group.image} alt={this.state.group.groupName} />
                  </figure>
                </div>
              </div>
              <Link to={`/groups/${this.state.group._id}/edit`}>
                <button className="button">Edit</button>
              </Link>
              <button onClick={this.handleDelete}className="button">Delete</button>
            </div>

            <div className="column is-half-desktop">
              <div className="media">
                <p>{this.state.group.info}</p>
                <button onClick={this.addToGroup} className="button">Join</button>
                <button onClick={this.removeFromGroup} className="button">Leave Group</button>
              </div>
            </div>
          </div>

          <form onSubmit={this.handleSubmit}>
            <Base64 name="image" handleChange={this.handleChange} />
            <button>Submit</button>
          </form>


          <div className="column is-one-third-desktop">
            {this.state.group.members.map(member =>
              <div key={member._id} className="card">
                <div key={member} className="card-image">
                  <figure key={member._id} className="image is-4by4">
                    <img src={member.image} alt={member.username} />
                  </figure>
                  <div className="media">
                    <Link to={`/users/${member._id}`}>
                      <p>{member.username}</p>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default GroupsShow;
