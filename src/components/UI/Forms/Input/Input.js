import React from 'react';
import styleModule from './Input.module.scss';

const input = (props) => {
  let inputElement;

  switch (props.elemType) {
    case 'input':
      inputElement = (
        <input
          className={styleModule.InputElement}
          {...props.elemConfig}
          value={props.value}
        />
      );
      break;
    case 'textare':
      inputElement = (
        <textarea
          className={styleModule.InputElement}
          {...props.elemConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={styleModule.InputElement}
          {...props.elemConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={styleModule.Input}>
      <label className={styleModule.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
