import React from 'react';
import styleModule from './Button.module.scss';

const button = (props) => (
  <button
    onClick={props.clicked}
    className={[styleModule.Button, styleModule[props.btnType]].join(' ')}
  >
    {props.children}
  </button>
);

export default button;
