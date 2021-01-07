import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Aux from '../../HOC/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ingredients: null, - handled by REDUX
      // totalPrice: 3.99, - handled by REDUX
      // purchaseable: false, - removed from state -
      // updatePurchaseState method modified to work w/o this.state.purchasable
      purchasing: false,
      isLoading: false,
      error: false,
    };
  }

  componentDidMount() {
    // ******************************************************* removed to be handled by REDUX
    // axios
    //   .get(
    //     'https://burger-project-react-1ceb0.firebaseio.com/ingredients.json'
    //   )
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  //
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredKey) => {
        return ingredients[ingredKey];
      })
      // exec reducer function, here (acc + val), w/ initial value 0.
      .reduce((acc, val) => acc + val, 0);
    // purchasable has been removed from state
    // this.setState({ purchaseable: sum > 0 });
    return sum > 0;
  };
  // *************************************************************** removed to be handled by REDUX
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;

  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];

  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };

  //   const updatedCount = oldCount > 0 ? oldCount - 1 : 0;
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;

  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  // ***************************************************************

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  closeModalHandler = () => {
    this.setState({ purchasing: false });
  };
  // *************************************************************** REDUX
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };
  //   // user is routed to the <CheckoutSummary> Component
  //   const queryParams = [];
  //   // iterate through the ingredients object in state
  //   for (let i in this.props.ingrds) {
  //     //push each ingred to the array with a helper method -
  //     // encodeURIComponent (encodes special character elements making them usable in the URL )
  //     queryParams.push(
  //       encodeURIComponent(i) +
  //         '=' +
  //         encodeURIComponent(this.props.ingrds[i])
  //     );
  //   }
  //   queryParams.push('price=' + this.props.prc);
  //   // transform queryParams array into a string, with '&' between they elems
  //   const queryString = queryParams.join('&');
  //   this.props.history.push({
  //     pathname: '/checkout',
  //     search: '?' + queryString,
  //   });
  // };
  // ***************************************************************

  render() {
    const disabledInfo = {
      ...this.props.ingrds,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded! </p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.props.ingrds) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingrds} />
          <BuildControls
            ordered={this.purchaseHandler}
            ingredAdded={this.props.handleAddedIngredient}
            ingredRemove={this.props.handleDeletedIngredient}
            disabled={disabledInfo}
            price={this.props.prc}
            // execute the updatePurchaseState every time the component is re-rendered, with the ingrds argument
            purchaseable={this.updatePurchaseState(this.props.ingrds)}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.prc}
          purchaseCancelled={this.closeModalHandler}
          purchaseConfirmed={this.purchaseContinueHandler}
          ingredients={this.props.ingrds}
          closeModal={this.closeModalHandler}
        />
      );
    }

    if (this.state.isLoading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.closeModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingrds: state.ingredients,
    prc: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddedIngredient: (ingName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredName: ingName,
      }),
    handleDeletedIngredient: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredName: ingName,
      }),
  };
};
// pass axios to the component
// pass props to all HOC to avoid issues
// withErrorHandler.js line 49
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
