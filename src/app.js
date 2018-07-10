import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import 'bulma';

import AuthRegister from './components/auth/Register';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/register" component={AuthRegister} />
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
