import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import withAuthService from '../withAuthService';
import routePath from '../routePath';

const PublicRoutes = ({ component: Component, checkAuth, ...rest }) => {
  return checkAuth() ? (
    <Redirect to={routePath.PROFILE} />
  ) : (
    <Route {...rest} component={Component} />
  );
};
export default withAuthService(PublicRoutes);
