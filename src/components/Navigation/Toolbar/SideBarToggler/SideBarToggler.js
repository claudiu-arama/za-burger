import React from 'react';
import styleModule from './SideBarToggler.module.scss';
import { FaBars, faBars } from 'react-icons/fa';

const sideBarToggler = (props) => {
  return (
    <div className={styleModule.Menu}>
      <FaBars onClick={props.openSideBar} size="30px" />
    </div>
  );
};

export default sideBarToggler;
