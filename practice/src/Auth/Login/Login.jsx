import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import { Container, CssBaseline } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import useStyles from '../styleAuth';
import error from '../../utils/error/error.module.scss';
import FormField from '../../Common/Material-Ui/FormField';
import routePath from '../../Routes/routePath';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

const Login = ({ handleSubmit, isFetching, errorMessage }) => {
  const classes = useStyles();
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Field
            component={FormField}
            type='text'
            name='email'
            label='Email Address'
            autoFocus
          />
          <Field
            component={FormField}
            type='password'
            name='password'
            label='Password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Login
          </Button>
          <NavLink to={routePath.SIGN_IN} className={classes.navLink}>
            Don`t have an account? Sign In
          </NavLink>
          <div>{isFetching && <CircularProgress />}</div>
          <div className={error.error}>{errorMessage}</div>
        </form>
      </div>
    </Container>
  );
};
Login.propTypes = propTypes;
export default reduxForm({
  form: 'login'
})(Login);
