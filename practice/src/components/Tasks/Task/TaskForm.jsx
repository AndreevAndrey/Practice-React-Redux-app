import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import style from './task.module.scss';
import DescriptionField from '../../../common/Material-Ui/DescriptionField';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired
};

const TaskForm = ({ handleSubmit, pristine }) => (
  <div className={style.task}>
    <form onSubmit={handleSubmit}>
      <Field component={DescriptionField} name='task' label='Write a task' />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={pristine}
      >
        Add task
      </Button>
    </form>
  </div>
);

const clearForm = (result, dispatch) => dispatch(reset('taskForm'));
TaskForm.propTypes = propTypes;

export default reduxForm({
  form: 'taskForm',
  onSubmitSuccess: clearForm
})(TaskForm);
