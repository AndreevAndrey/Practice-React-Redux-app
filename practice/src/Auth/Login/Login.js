import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import error from '../../utils/error/error.module.scss';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

const Login = ({ handleSubmit, isFetching, errorMessage }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field component='input' type='text' name='email' placeholder='Email' />
        <Field
          component='input'
          type='password'
          name='password'
          placeholder='Password'
        />
        <Button type='submit'>Login</Button>
        <div>{isFetching && <CircularProgress />}</div>
        <div className={error.error}>{errorMessage}</div>
      </form>
    </>
  );
};
Login.propTypes = propTypes;
export default reduxForm({
  form: 'login'
})(Login);
