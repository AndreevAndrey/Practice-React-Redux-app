import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './Login';
import login from './loginAction';

const propTypes = {
  login: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

const LoginContainer = ({ login, isFetching, errorMessage }) => {
  const onSubmit = user => {
    login(user);
  };
  return (
    <Login
      onSubmit={onSubmit}
      isFetching={isFetching}
      errorMessage={errorMessage}
    />
  );
};

const mapStateToProps = ({ login: { isFetching, errorMessage } }) => ({
  isFetching,
  errorMessage
});
LoginContainer.propTypes = propTypes;
export default connect(mapStateToProps, { login })(LoginContainer);
