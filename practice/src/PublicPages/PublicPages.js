import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import LoginContainer from '../Auth/Login/LoginContainer';
import SignInContainer from '../Auth/SignIn/SignInContainer';
import routePath from '../Routes/routePath';
import style from '../Header/header.module.scss';

const PublicPages = () => (
  <>
    <div className={style.header}>
      <NavLink to={routePath.LOG_IN} activeClassName={style.active}>
        Login
      </NavLink>
      <NavLink to={routePath.SIGN_IN} activeClassName={style.active}>
        Sign in
      </NavLink>
    </div>
    <Switch>
      <Route path={routePath.LOG_IN} component={LoginContainer} />
      <Route path={routePath.SIGN_IN} component={SignInContainer} />
    </Switch>
  </>
);
export default PublicPages;
