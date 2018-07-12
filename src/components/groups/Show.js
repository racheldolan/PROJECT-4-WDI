import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Base64 from '../common/Base64';

class GroupsShow extends React.Component {

  constructor(){
    super();
    this.state = {
      group: {},
      books: []
    };
  }

  componentDidMount() {
    axios({
      url: `/api/groups/${this.props.match.params.id}`,
      method: 'GET'
    })
      .then(res => this.setState({ group: res.data }));
  }

  handleDelete = () => {
    axios({
      url: `/api/groups/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => this.props.history.push('/groups'));
  }

  addToGroup = (e) => {
    e.preventDefault();
    axios({
      url: `/api/users/${Auth.getPayload().sub}/groups`,
      method: 'PUT',
      data: this.state,
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
      // .then(res => console.log(res.data));
      .then(res => this.setState({ books: res.data}));
  }

  render(){
    // console.log(Auth.getPayload().sub);
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
                    <li key={book._id}>
                      <a href={book.url} key={book._id}>{book.url}</a>
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
              </div>
            </div>
          </div>

          <form onSubmit={this.handleSubmit}>

            <Base64 name="image" handleChange={this.handleChange} />
            <button>Submit</button>

          </form>



        </section>
      </main>
    );
  }
}

export default GroupsShow;
