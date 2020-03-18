import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import withAuthService from '../withAuthService';
import routePath from '../routePath';

const propTypes = {
  component: PropTypes.func.isRequired,
  token: PropTypes.string
};

const defaultProps = {
  token: ''
};

const PublicRoutes = ({ component: Component, token, ...rest }) => {
  return token ? (
    <Redirect to={routePath.PROFILE} />
  ) : (
    <Route {...rest} component={Component} />
  );
};
PublicRoutes.propTypes = propTypes;
PublicRoutes.defaultProps = defaultProps;
export default withAuthService(PublicRoutes);
