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
    <NavLink to='/login' activeClassName={style.active}>
      Login
    </NavLink>
    <NavLink to='/signin' activeClassName={style.active}>
      Sign in
    </NavLink>
  </div>
);
export default Header;
