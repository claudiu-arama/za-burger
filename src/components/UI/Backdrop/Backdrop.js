import React from 'react';
import StyleModule from './Backdrop.module.scss';

const backdrop = (props) =>
  props.show ? (
    <div className={StyleModule.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
