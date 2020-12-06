import React from 'react';
import styleModule from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavBar from '../NavBar/NavBar';
import SideBarToggler from './SideBarToggler/SideBarToggler';

const toolbar = (props) => {
  return (
    <header className={styleModule.Toolbar}>
      <SideBarToggler openSideBar={props.openSideBar} />
      <div className={styleModule.Logo}>
        <Logo />
      </div>

      <nav className={styleModule.DesktopOnly}>
        <NavBar />
      </nav>
    </header>
  );
};

export default toolbar;
