import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import styleModule from './Logo.module.scss';

const logo = (props) => (
  <div className={styleModule.Logo}>
    <img src={burgerLogo} alt="burger-logo" />
  </div>
);

export default logo;
