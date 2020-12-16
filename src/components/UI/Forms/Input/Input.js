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
          onChange={props.textInput}
        />
      );
      break;
    case 'textare':
      inputElement = (
        <textarea
          className={styleModule.InputElement}
          {...props.elemConfig}
          value={props.value}
          onChange={props.textInput}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={styleModule.InputElement}
          value={props.value}
          onChange={props.textInput}>
          {props.elemConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={styleModule.InputElement}
          {...props.elemConfig}
          value={props.value}
          onChange={props.textInput}
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
