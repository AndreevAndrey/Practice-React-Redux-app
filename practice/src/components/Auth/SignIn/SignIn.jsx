import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Container, CssBaseline } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import error from '../../../utils/error/error.module.scss';
import FormField from '../../../common/Material-Ui/FormField';
import useStyles from '../styleAuth';
import routePath from '../../Routes/routePath';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

const SignIn = ({ handleSubmit, isFetching, errorMessage }) => {
  const classes = useStyles();
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <Field
            component={FormField}
            type='text'
            name='name'
            label='Name'
            autoFocus
          />
          <Field component={FormField} type='text' name='email' label='Email' />
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
            Sign in
          </Button>
          <NavLink to={routePath.LOG_IN} className={classes.navLink}>
            Already have an account? Log In
          </NavLink>
          <div>{isFetching && <CircularProgress />}</div>
          <div className={error.error}>{errorMessage}</div>
        </form>
      </div>
    </Container>
  );
};
SignIn.propTypes = propTypes;
export default reduxForm({
  form: 'signIn'
})(SignIn);
