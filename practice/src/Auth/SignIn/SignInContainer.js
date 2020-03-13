import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import signIn from './signInAction';

const propTypes = {
  signIn: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

const SignInContainer = ({ signIn, isFetching, errorMessage }) => {
  const onSubmit = user => {
    signIn(user);
  };
  return (
    <SignIn
      onSubmit={onSubmit}
      isFetching={isFetching}
      errorMessage={errorMessage}
    />
  );
};

const mapStateToProps = ({ signIn: { isFetching, errorMessage } }) => ({
  isFetching,
  errorMessage
});
SignInContainer.propTypes = propTypes;
export default connect(mapStateToProps, { signIn })(SignInContainer);
