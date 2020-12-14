import React from 'react';
import Burger from '../../Burger/Burger';
import styleModule from './CheckoutSummary.module.scss';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
  return (
    <div className={styleModule.CheckoutSummary}>
      <h1>Enjoy your great and tasty burger!</h1>
      <div className={styleModule.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.CheckoutCancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.CheckoutContinue}>
        Proceed
      </Button>
    </div>
  );
};

export default checkoutSummary;
