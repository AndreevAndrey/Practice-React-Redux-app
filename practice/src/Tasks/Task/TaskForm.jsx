import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import PropTypes from 'prop-types';
import style from './task.module.scss';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const TaskForm = ({ handleSubmit }) => (
  <div className={style.task}>
    <form onSubmit={handleSubmit}>
      <Field component='input' name='task' type='text' maxLength={200} />
      <button type='submit'>Add task</button>
    </form>
  </div>
);

const clearForm = (result, dispatch) => dispatch(reset('taskForm'));
TaskForm.propTypes = propTypes;

export default reduxForm({
  form: 'taskForm',
  onSubmitSuccess: clearForm
})(TaskForm);
