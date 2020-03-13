import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import error from '../../utils/error/error.module.scss';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

const SignIn = ({ handleSubmit, isFetching, errorMessage }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field component='input' type='text' name='name' placeholder='Name' />
      <Field component='input' type='text' name='email' placeholder='Email' />
      <Field
        component='input'
        type='password'
        name='password'
        placeholder='Password'
      />
      <Button type='submit'>Sign in</Button>
      <div>{isFetching && <CircularProgress />}</div>
      <div className={error.error}>{errorMessage}</div>
    </form>
  );
};
SignIn.propTypes = propTypes;
export default reduxForm({
  form: 'signIn'
})(SignIn);
