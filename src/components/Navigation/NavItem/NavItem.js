import React from 'react';
import styleModule from './NavItem.module.scss';
import { NavLink } from 'react-router-dom';

const navItem = (props) => {
  return (
    <li className={styleModule.NavItem}>
      <NavLink
        activeClassName={styleModule.active}
        to={props.link}
        exact={props.exact}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default navItem;
