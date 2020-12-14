import React from 'react';
import spinner from '../../UI/Spinner/Spinner';
import styleModule from './Order.module.scss';

const order = (props) => {
  // logic to transform ingredients into array of ingredients -> Burger component
  // alternatively:
  const ingredients = [];
  // for...in loop - the variable elem is the prop name
  for (let ingredName in props.ingredients) {
    // we push an object with the name and ammount into the array
    ingredients.push({
      name: ingredName,
      amount: props.ingredients[ingredName],
    });
  }

  const ingredOutput = ingredients.map((ingred) => {
    return (
      <span key={ingred.name} className={styleModule.OrderTile}>
        {ingred.name} ({ingred.amount})
      </span>
    );
  });

  return (
    <div className={styleModule.Order}>
      <p>Ingredients: {ingredOutput}</p>
      <p>
        Price:{' '}
        {/* convert the props.price into a number, with 2 decimals */}
        <strong>${Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
