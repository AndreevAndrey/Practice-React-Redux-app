import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import style from './header.module.scss';
import routePath from '../Routes/routePath';

const propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isToggle: PropTypes.bool.isRequired
};

const Header = ({ toggleTheme, isToggle }) => (
  <div className={isToggle ? style.header : style.darkTheme}>
    <Button className={style.button} variant='contained'>
      Log Out
    </Button>
    <NavLink exact to={routePath.PROFILE} activeClassName={style.active}>
      Profile
    </NavLink>
    <NavLink to={routePath.TASKS} activeClassName={style.active}>
      Tasks
    </NavLink>
    <FormControlLabel
      className={style.switch}
      control={<Switch checked={!isToggle} onChange={toggleTheme} />}
      label={isToggle ? `Light Theme` : `Dark Theme`}
    />
  </div>
);
Header.propTypes = propTypes;
export default Header;
