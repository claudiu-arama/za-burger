import React from 'react';
import styleModule from './NavBar.module.scss';
import NavItem from '../NavItem/NavItem';

const navBar = (props) => (
  <ul className={styleModule.NavBar}>
    <NavItem link="/" exact>
      Burger Builder
    </NavItem>
    <NavItem link="/orders">Orders</NavItem>
  </ul>
);

export default navBar;
