import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './header.module.scss';
import routePath from '../Routes/routePath';

const Header = () => (
  <div className={style.header}>
    <NavLink exact to={routePath.PROFILE} activeClassName={style.active}>
      Profile
    </NavLink>
    <NavLink to={routePath.TASKS} activeClassName={style.active}>
      Tasks
    </NavLink>
  </div>
);
export default Header;
