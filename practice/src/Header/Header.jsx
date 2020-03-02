import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './header.module.scss';

const Header = () => (
  <div className={style.header}>
    <NavLink to='/profile' activeClassName={style.active}>
      Profile
    </NavLink>
    <NavLink to='/tasks' activeClassName={style.active}>
      Tasks
    </NavLink>
  </div>
);
export default Header;
