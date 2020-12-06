import React from 'react';
import styleModule from './NavBar.module.scss';
import NavItem from '../NavItem/NavItem';

const navBar = (props) => (
  <ul className={styleModule.NavBar}>
    <NavItem link="/" active>
      Burger Builder
    </NavItem>
    <NavItem link="/">Check Out</NavItem>
  </ul>
);

export default navBar;
