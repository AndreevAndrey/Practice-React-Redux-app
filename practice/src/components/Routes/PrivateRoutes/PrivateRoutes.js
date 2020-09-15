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

const PrivateRoutes = ({ component: Component, token, ...rest }) => {
  return token ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to={routePath.LOG_IN} />
  );
};
PrivateRoutes.propTypes = propTypes;
PrivateRoutes.defaultProps = defaultProps;
export default withAuthService(PrivateRoutes);
