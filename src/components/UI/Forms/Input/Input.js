import React from 'react';
import styleModule from './Input.module.scss';

const input = (props) => {
  let inputElement;
  const inputClasses = [styleModule.InputElement];

  if (props.inValid && props.shouldValidate && props.touched) {
    inputClasses.push(styleModule.Invalid);
  }

  let validationError = null;
  if (props.inValid && props.touched) {
    validationError = (
      <p className={styleModule.ValidationError}>
        Please enter a valid value!
      </p>
    );
  }

  switch (props.elemType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elemConfig}
          value={props.value}
          onChange={props.textInput}
        />
      );
      break;
    case 'textare':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elemConfig}
          value={props.value}
          onChange={props.textInput}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
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
          className={inputClasses.join(' ')}
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
      {validationError}
    </div>
  );
};

export default input;
