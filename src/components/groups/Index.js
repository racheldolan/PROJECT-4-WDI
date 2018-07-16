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
    axios.get('/api/groups')
      .then(res => this.setState({groups: res.data }));
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  }

  filteredGroups = () => {
    const re = new RegExp(this.state.search, 'i');
    return this.state.groups.filter(group => {
      return re.test(group.groupName) || re.test(group.info);
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
              <div className="filters">
                <input className="input search-bar" placeholder="Search" onChange={this.handleSearch}/>
              </div>
            </div>
          </div>
        </section>

        <div className="container groups-list">
          <div className="notification">
            {this.filteredGroups().map(group =>
              <article key={group._id} className="media">
                <figure className="media-left">
                  <p className="image is-64x64">
                    <img src={group.image} />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content group-title">
                    <p className="groupName">
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
