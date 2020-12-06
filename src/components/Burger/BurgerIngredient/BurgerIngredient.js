import React from 'react';
import styleModule from './BurgerIngredient.module.scss';
import PropTypes from 'prop-types';


const burgerIngredients = (props) => {
  let ingredient = null;

  switch (props.type) {
    case 'bread-bottom':
      ingredient = <div className={styleModule.BreadBottom}></div>;
      break;

    case 'bread-top':
      ingredient = (
        <div className={styleModule.BreadTop}>
          <div className={styleModule.Seeds1}></div>
          <div className={styleModule.Seeds2}></div>
        </div>
      );
      break;

    case 'meat':
      ingredient = <div className={styleModule.Meat}></div>;
      break;

    case 'cheese':
      ingredient = <div className={styleModule.Cheese}></div>;
      break;

    case 'salad':
      ingredient = <div className={styleModule.Salad}></div>;
      break;

    case 'bacon':
      ingredient = <div className={styleModule.Bacon}></div>;
      break;

    default:
      ingredient = null;
  }

  return ingredient;
};

burgerIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngredients;
