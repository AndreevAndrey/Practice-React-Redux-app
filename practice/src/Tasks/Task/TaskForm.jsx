import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import style from './task.module.scss';
import formField from '../../Common/Material-Ui/FormField';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const TaskForm = ({ handleSubmit }) => (
  <div className={style.task}>
    <form onSubmit={handleSubmit}>
      <Field component={formField} name='task' label='Write a task' />
      <Button type='submit' variant='contained' color='primary'>
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
