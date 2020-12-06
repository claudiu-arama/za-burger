import React from 'react';
import styleModule from './NavItem.module.scss';

const navItem = (props) => {
  return (
    <li className={styleModule.NavItem}>
      <a href={props.link} className={props.active ? styleModule.active : null}>
        {props.children}
      </a>
    </li>
  );
};

export default navItem;



