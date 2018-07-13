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
        members: [],
        books: []
      }
    };
  }
  // getting data from back end to display on page
  componentDidMount() {

    axios({
      url: `/api/groups/${this.props.match.params.id}`,
      method: 'GET'
    })
      .then(res => this.setState({ group: res.data, user: Auth.getCurrentUser() }))
      .catch(err => this.setState({ error: err.message }));

  }

  // deletes group
  handleDelete = () => {
    axios({
      url: `/api/groups/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => this.props.history.push('/groups'));
  }

  // removes user from group
  leaveGroup = () => {
    axios({
      method: 'DELETE',
      url: `/api/groups/${this.props.match.params.id}/members`,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ group: res.data }));
  }
  // adds user to group and group to user
  joinGroup = () => {
    axios({
      url: `/api/groups/${this.props.match.params.id}/members`,
      method: 'POST',
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ group: res.data }));
  }

  handleChange = ({ target: { name, value } }) => {
    if(name === 'image') {
      return axios({
        url: '/api/vision',
        method: 'POST',
        data: { image: value }
      })
        .then(res => {
          const books = this.state.group.books.slice();
          if(books.length) {
            books[books.length-1] = { image: value, url: res.data[0].url };
          } else {
            books.push({ image: value, url: res.data[0].url });
          }
          const group = { ...this.state.group, books };
          this.setState({ group });
        });
    }
    this.setState({ [name]: value });
  }

  // makes the request to the back end which then makes a proxy request to vision api
  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      url: `/api/groups/${this.props.match.params.id}`,
      method: 'PUT',
      data: this.state.group,
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ group: res.data }));
  }


  render(){
    // console.log(this.state.group.members);
    console.log(this.state);
    return(
      <main>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {this.state.group.groupName}
              </h1>
              {/* displays books urls currently - needs to move */}
              <h2 className="subtitle">
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
                    <img className="image" src={this.state.group.image} alt={this.state.group.groupName} />
                  </figure>
                </div>
              </div>
              <Link to={`/groups/${this.state.group._id}/edit`}>
                <button className="button">Edit</button>
              </Link>
              <button onClick={this.handleDelete}className="button">Delete</button>
            </div>

            {/* displays group info */}
            <div className="column is-half-desktop">
              <div className="content">
                <p>{this.state.group.info}</p>
                <p>Members: {this.state.group.members.length}</p>
                <button onClick={this.joinGroup} className="button">Join Group</button>
                <button onClick={this.leaveGroup} className="button">Leave Group</button>
              </div>
            </div>
          </div>

          {/* form for inputting images which then makes call to api on submit */}
          <form onSubmit={this.handleSubmit}>
            <Base64 name="image" handleChange={this.handleChange} />
            <button>Add to group</button>
          </form>

          {this.state.group.books.map((book, i) =>
            <a key={i} href={book.url} target="_blank">
              <img className="image-book" src={book.image} />
            </a>
          )}

          {/*  displays users who belong to a group */}
          <div className="column is-one-third-desktop">
            {this.state.group.members.map(member =>
              <div key={member._id} className="card">
                <div key={member} className="card-image">
                  <figure key={member.username} className="image is-4by4">
                    <img className="image" src={member.image} alt={member.username} />
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
