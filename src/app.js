import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import 'bulma';

import AuthRegister from './components/auth/Register';
import AuthLogin from './components/auth/Login';
import GroupsIndex from './components/groups/Index';
import GroupsShow from './components/groups/Show';
import GroupsNew from './components/groups/New';
import GroupsEdit from './components/groups/Edit';
import UserShow from './components/users/Show';
import UserEdit from './components/users/Edit';
import Navbar from './components/common/Navbar';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar></Navbar>
          <Switch>
            <Route path="/register" component={AuthRegister} />
            <Route path="/login" component={AuthLogin} />
            <Route path="/groups/new" component={GroupsNew} />
            <Route path="/groups/:id/edit" component={GroupsEdit} />
            <Route path="/groups/:id" component={GroupsShow} />
            <Route path="/groups" component={GroupsIndex} />
            <Route path="/users/:id/edit" component={UserEdit} />
            <Route path="/users/:id" component={UserShow} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
