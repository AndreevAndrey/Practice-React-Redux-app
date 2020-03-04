import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  }).isRequired
};

const formField = ({ input, meta: { touched, error }, ...custom }) => (
  <TextField
    inputProps={{
      maxLength: 300
    }}
    multiline
    variant='outlined'
    margin='normal'
    fullWidth
    rowsMax='3'
    type='text'
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

formField.propTypes = propTypes;
export default formField;
