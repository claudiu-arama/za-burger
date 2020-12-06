import React from 'react';
import styleModule from './BuildControls.module.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
  return (
    <div className={styleModule.BuildControls}>
      <p>
        Current Burger Price: <strong>${props.price.toFixed(2)}</strong>
      </p>
      {controls.map((item, index) => {
        return (
          <BuildControl
            label={item.label}
            key={item.label}
            added={props.ingredAdded.bind(this, item.type)}
            removed={props.ingredRemove.bind(this, item.type)}
            disabled={props.disabled[item.type]}
          />
        );
      })}

      <button
        onClick={props.ordered}
        className={styleModule.OrderButton}
        disabled={!props.purchaseable}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
