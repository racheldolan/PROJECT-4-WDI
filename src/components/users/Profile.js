// import React from 'react';
// import { Link } from 'react-router-dom';
// import Auth from '../../lib/Auth';
// import axios from 'axios';
//
// class Profile extends React.Component{
//
//
//   constructor(){
//     super();
//     this.state = {
//       // user: {
//       //   groups: [
//       //   ]
//       // },
//       currentUser: Auth.getCurrentUser()
//     };
//   }
//
//   componentDidMount() {
//     axios({
//       url: '/api/profile',
//       method: 'GET',
//       data: this.state
//     })
//       .then(res => this.setState({ currentUser: res.data }, () => console.log(this.state)));
//   }
//
//     handleDelete = () => {
//       axios({
//         url: `/api/users/${this.props.match.params.id}`,
//         method: 'DELETE'
//       })
//         .then(Auth.logout())
//         .then(() => this.props.history.push('/'));
//     }
//
//     render(){
//       console.log(this.state);
//       return(
//         <main className="user-show">
//           <section className="hero">
//             <div className="hero-body">
//               <div className="container">
//                 <h1 className="title">
//                   Hi  {this.state.currentUser.username}
//                 </h1>
//               </div>
//             </div>
//           </section>
//           <div className="groups-show-info">
//             <section className="container groups-show-container">
//               <div className="columns is-multiline">
//                 <div className="column is-one-third-desktop">
//                   <img src={this.state.currentUser.image} alt={this.state.currentUser.username} />
//                   <div>
//                     <Link to={`/users/${Auth.getPayload().sub}/edit`}>
//                       <button className="button users-show-buttons">Edit</button>
//                     </Link>
//                     <button onClick={this.handleDelete} className="button users-show-buttons">Delete Account</button>
//                   </div>
//                   <hr />
//                   <h1 className="title">My Groups:</h1>
//                   <h1 className="title">Groups:</h1>
//                 </div>
//
//                 <div className="column is-two-thirds-desktop">
//                   <ul>
//                     <li>{this.state.currentUser.username} belongs to {this.state.currentUser.groups.length} group(s)</li>
//                   </ul>
//
//                   <div className="bio">
//                     <p>{this.state.currentUser.bio}</p>
//                   </div>
//
//                 </div>
//
//                 {/* <div className="columns"> */}
//                 {this.state.currentUser.groups.map(group =>
//                   <div  key={group._id} className="column is-one-third-desktop is-half-mobile">
//                     <div>
//                       <div className="users-show-info">
//                         <Link to={`/groups/${group._id}`}>
//                           <img src={group.image} alt={group.groupName} />
//                         </Link>
//                         <h2 className="subtitle">{group.groupName}</h2>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {/* </div> */}
//               </div>
//             </section>
//
//           </div>
//         </main>
//
//       );
//     }
//
//
// }
//
// export default Profile;
