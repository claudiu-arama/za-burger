import React from 'react';
import Logo from '../../Logo/Logo';
import NavBar from '../NavBar/NavBar';
import styleModule from './SideDrawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/Auxiliary';

const sideDrawer = (props) => {
  let attachedClasses = [styleModule.SideDrawer, styleModule.Close];
  if (props.open) {
    attachedClasses = [styleModule.SideDrawer, styleModule.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={styleModule.Logo}>
          <Logo />
        </div>
        <nav>
          <NavBar />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
