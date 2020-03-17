import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileContainer from '../Profile/ProfileContainer';
import TasksContainer from '../Tasks/TasksContainer';
import routePath from '../Routes/routePath';
import Header from '../Header/Header';
import '../App/App.css';

const PrivatePages = () => (
  <>
    <Header />
    <div className='page'>
      <Switch>
        <Route exact path={routePath.PROFILE} component={ProfileContainer} />
        <Route path={routePath.TASKS} component={TasksContainer} />
      </Switch>
    </div>
  </>
);
export default PrivatePages;
