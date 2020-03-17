import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginContainer from '../Auth/Login/LoginContainer';
import SignInContainer from '../Auth/SignIn/SignInContainer';
import routePath from '../Routes/routePath';

const PublicPages = () => (
  <Switch>
    <Route path={routePath.LOG_IN} component={LoginContainer} />
    <Route path={routePath.SIGN_IN} component={SignInContainer} />
  </Switch>
);
export default PublicPages;
