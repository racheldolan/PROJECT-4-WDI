import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class GroupsIndex extends React.Component {

  constructor(){
    super();
    this.state = {
      groups: []
    };
  }


  componentDidMount(){
    axios({
      url: '/api/groups',
      method: 'GET'
    })
      .then(res => this.setState({groups: res.data }));
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  }

  filteredGroups = () => {
    const re = new RegExp(this.state.search, 'i');
    return this.state.groups.filter(group => {
      return re.test(group.title);
    });
  }

  render(){
    return(
      <section className="groups-index">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Find your next group
              </h1>
              <h2 className="subtitle">
                Hero subtitle
              </h2>
            </div>
          </div>
        </section>
        <div className="filters">
          <input className="input" placeholder="Search" onChange={this.handleSearch}/>
          <div className="control">
            <div className="select is-fullwidth">
              <select onChange={this.handleSort}>
                <option value="name|asc">Name (A-Z)</option>
                <option value="name|desc">Name (Z-A)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container groups-list">
          <div className="notification">
            {this.state.groups.map(group =>
              <article key={group._id} className="media">
                <figure className="media-left">
                  <p className="image is-64x64">
                    <img src={group.image} />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content group-title">
                    <p>
                      <strong>{group.groupName}</strong>
                      <br />
                      {group.info}
                    </p>
                  </div>
                  <nav className="level is-mobile">
                    <div className="level-left">
                    </div>
                  </nav>
                </div>
                <div className="media-right">
                  <Link to={`/groups/${group._id}`}>
                    <button className="button groups-index-button">See More</button>
                  </Link>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default GroupsIndex;
