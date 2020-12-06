import React from 'react';
import styleModule from './Burger.module.scss';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

const burger = (props) => {
  // render burger visually, based on state.ingredients
  // convert object(props) -> array of keys of the props.ingredients object
  let transformedIngredients = Object.keys(props.ingredients)
    //map through the elem in the array
    .map((ingredient) => {
      // return array -> spread operator w/ Array(value of props.ingredient) constructor -> Array w/ length = props.ingredients[ingredient]
      // map new array (_ -> value is not relevant, index -> used for unque key )
      return [...Array(props.ingredients[ingredient])].map((_, index) => {
        // return <BurgerIngredient /> component with unique keys
        return <BurgerIngredient key={ingredient + index} type={ingredient} />;
      });
    })
    // exec reducer funct, empty array as source
    .reduce((prevValue, currValue) => {
      // concat() to merge the array elems -> new array created
      return prevValue.concat(currValue);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start adding ingredients!</p>;
  }

  return (
    <div className={styleModule.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
