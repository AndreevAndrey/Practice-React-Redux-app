import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileContainer from '../Profile/ProfileContainer';
import TasksContainer from '../Tasks/TasksContainer';
import routePath from '../Routes/routePath';
import Header from '../Header/Header';
import style from './privatePage.module.scss';

const PrivatePages = () => {
  const [isToggle, setTheme] = useState(true);
  const toggleTheme = () => setTheme(!isToggle);
  return (
    <>
      <Header toggleTheme={toggleTheme} isToggle={isToggle} />
      <div className={isToggle ? style.page : style.darkTheme}>
        <Switch>
          <Route exact path={routePath.PROFILE} component={ProfileContainer} />
          <Route path={routePath.TASKS} component={TasksContainer} />
        </Switch>
      </div>
    </>
  );
};
export default PrivatePages;
