import React from 'react';
import Auth from '../../lib/Auth';
import { Redirect, Route } from 'react-router-dom';
import Flash from '../../lib/Flash';

const ProtectedRoute = ({component: Component, ...props }) => {
  if(!Auth.isAuthenticated()) Flash.setMessage('danger', 'You must be logged in');

  return Auth.isAuthenticated() ? <Route {...props} component={Component} /> : <Redirect to='/login' />;
};

export default ProtectedRoute;
