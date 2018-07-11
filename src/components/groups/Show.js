import React from 'react';
import axios from 'axios';

class GroupsShow extends React.Component {

  constructor(){
    super();
    this.state = {
      group: {}
    };
  }

  componentDidMount() {
    axios({
      url: `/api/groups/${this.props.match.params.id}`,
      method: 'GET'
    })
      .then(res => this.setState({ group: res.data }));
  }

  render(){
    return(
      <main>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {this.state.group.groupName}
              </h1>
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
                    <img src={this.state.group.image} alt={this.state.group.groupName} />
                  </figure>
                </div>
              </div>
            </div>

            <div className="column is-half-desktop">
              <div className="media">
                <p>{this.state.group.about}</p>
                <button className="button">Join</button>
                <button className="button">Edit</button>
                <button className="button">Delete</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default GroupsShow;
