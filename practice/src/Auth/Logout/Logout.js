import React from 'react';
import Button from '@material-ui/core/Button';
import style from '../../Header/header.module.scss';
import history from '../../utils/history/history';
import routePath from '../../Routes/routePath';

const Logout = () => {
  const logOut = () => {
    const isLogout = window.confirm('Are you sure you want to log out?');
    if (isLogout) {
      localStorage.clear();
      history.push(routePath.LOG_IN);
    }
  };
  return (
    <Button className={style.button} variant='contained' onClick={logOut}>
      Log Out
    </Button>
  );
};

export default Logout;
