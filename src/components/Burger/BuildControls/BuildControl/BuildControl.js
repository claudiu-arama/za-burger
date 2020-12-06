import React from 'react';
import styleModule from './BuildControl.module.scss';

const buildControl = (props) => {
  return (
    <div className={styleModule.BuildControl}>
      <div className={styleModule.Label}>{props.label}</div>
      <button
        className={styleModule.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        Remove
      </button>
      <button className={styleModule.More} onClick={props.added}>
        Add
      </button>
    </div>
  );
};

export default buildControl;
