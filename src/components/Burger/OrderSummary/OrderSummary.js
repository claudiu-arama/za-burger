import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import styleModule from './OrderSummary.module.scss';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredKey) => {
        return (
          <li key={ingredKey}>
            <span style={{ textTransform: 'capitalize' }}>{ingredKey}</span>:
            {this.props.ingredients[ingredKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <button className={styleModule.Button} onClick={this.props.closeModal}>
          X
        </button>
        <h3>Your Order</h3>
        <p>Delicious burger with the following ingredients: </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to CheckOut?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL?
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseConfirmed}>
          CONTINUE?
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
