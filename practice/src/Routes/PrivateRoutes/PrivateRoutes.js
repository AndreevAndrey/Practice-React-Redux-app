import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import withAuthService from '../withAuthService';
import routePath from '../routePath';

const PrivateRoutes = ({ component: Component,token, ...rest }) => {
  return token ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to={routePath.LOG_IN} />
  );
};
export default withAuthService(PrivateRoutes);
