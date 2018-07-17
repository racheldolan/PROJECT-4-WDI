import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import 'bulma';
import './scss/style.scss';

import ProtectedRoute from './components/common/ProtectedRoute';
import FlashMessages from './components/common/FlashMessages';
import AuthRegister from './components/auth/Register';
import AuthLogin from './components/auth/Login';
import GroupsIndex from './components/groups/Index';
import GroupsShow from './components/groups/Show';
import GroupsNew from './components/groups/New';
import GroupsEdit from './components/groups/Edit';
import Profile from './components/users/Profile';
import UserShow from './components/users/Show';
import UserEdit from './components/users/Edit';
import Navbar from './components/common/Navbar';
import NotFound from './pages/NotFound';
import Home from './pages/Home';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar></Navbar>
          <FlashMessages />
          <Switch>
            <Route path="/register" component={AuthRegister} />
            <Route path="/login" component={AuthLogin} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/groups/new" component={GroupsNew} />
            <ProtectedRoute path="/groups/:id/edit" component={GroupsEdit} />
            <ProtectedRoute path="/groups/:id" component={GroupsShow} />
            <Route path="/groups" component={GroupsIndex} />
            <ProtectedRoute path="/users/:id/edit" component={UserEdit} />
            <ProtectedRoute path="/users/:id" component={UserShow} />
            <Route path="/" component={Home} />
            <Route component={NotFound} />
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
