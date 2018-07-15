import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Base64  from '../common/Base64';
import CommentForm  from './CommentForm';

class GroupsShow extends React.Component {

  constructor(){
    super();
    this.state = {
      user: {},
      group: {
        members: [],
        books: [],
        comments: [],
        creator: {}
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

  commentCreate = (e) => {
    e.preventDefault();
    axios({
      url: `/api/groups/${this.props.match.params.id}/comments`,
      method: 'POST',
      data: { content: this.state.comment },
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ group: res.data }));
  }

  // handleChange = ({ target: { name, value }}) => {
  //   this.setState({ [name]: value });
  // }

  handleCommentChange = (e) => {
    this.setState({ comment: e.target.value }, () => console.log(this.state));
  }

  render(){

    return(
      <main className="groups-show">
        <section className="hero groups-show-hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {this.state.group.groupName}
              </h1>
              {/* displays books urls currently - needs to move */}
            </div>
          </div>
        </section>



        <div className="groups-show-info">
          <section className="container groups-show-container">
            <div className="columns">

              <div className="column is-two-thirds-desktop">
                <img className="image groups-show-image" src={this.state.group.image} alt={this.state.group.groupName} />
                <Link to={`/groups/${this.state.group._id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button onClick={this.handleDelete}>Delete</button>

                {/* displays group info */}
                <div className="content">

                  <p>{this.state.group.info}</p>

                  <p>Members:  {this.state.group.members.length}</p>

                  {this.state.group.creator && <Link to={`/users/${this.state.group.creator._id}`}> <p className="groups-show-creator">Created by <strong>{this.state.group.creator.username}</strong></p>
                  </Link>}
                  {Auth.isAuthenticated() && <button onClick={this.joinGroup} className="button groups-show-buttons">Join Group</button>}
                  {Auth.isAuthenticated() && <button onClick={this.leaveGroup} className="button groups-show-buttons">Leave Group</button>}
                </div>
              </div>

              <div className="column is-one-third-desktop is-half-mobile">
                <div className="current-book">
                  <h1 className="title">Current Book</h1>
                  <h2 className="subtitle">Click for more info</h2>
                  {this.state.group.books.map((book, i) =>
                    <a key={i} href={book.url} target="_blank">
                      <img className="image-book" src={book.image} />
                    </a>
                  )}
                  {/* form for inputting images which then makes call to api on submit */}
                  <form onSubmit={this.handleSubmit}>
                    <Base64 name="image" handleChange={this.handleChange} />
                    {this.state.group.creator && <button>Add to group</button>}
                  </form>
                </div>
              </div>
            </div>


            {/*  displays users who belong to a group */}
            <div className="columns is-multiline">
              {this.state.group.members.map(member =>
                <div key={member.email} className="column is-one-quarter-desktop">
                  <div key={member._id} className="card">
                    <div key={member} className="card-image">
                      <Link to={`/users/${member._id}`}>
                        <figure key={member.username} className="image is-4by4">
                          <img className="image" src={member.image} alt={member.username} />
                        </figure>
                      </Link>
                      {/* <div className="media">
                          <p>{member.username}</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              )}

              <CommentForm
                handleCommentChange={this.handleCommentChange}
                commentCreate={this.commentCreate}
                data={this.state} />

              {this.state.group.comments.map((comment, i) =>
                <div key={comment._id}>
                  <p key={comment.author._id}>{comment.author.username}</p>
                  <p key={i}>{comment.content}</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    );
  }
}

export default GroupsShow;
