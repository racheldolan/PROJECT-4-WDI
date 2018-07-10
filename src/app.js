import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import 'bulma';

import AuthRegister from './components/auth/Register';
import AuthLogin from './components/auth/Login';
import GroupsIndex from './components/groups/Index';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={AuthRegister} />
          <Route path="/login" component={AuthLogin} />
          <Route path="/groups" component={GroupsIndex} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
