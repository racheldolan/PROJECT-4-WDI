import React from 'react';
import axios from 'axios';

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

  render(){
    return(
      <section>
        {this.state.groups.map(group =>
          <article key={group._id} className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={group.image} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{group.title}</strong>
                  <br />
                  {group.about}
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                </div>
              </nav>
            </div>
            <div className="media-right">
              <button className="button">See More</button>
            </div>
          </article>
        )}
      </section>
    );
  }
}

export default GroupsIndex;
