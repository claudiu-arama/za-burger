import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {},
      totalPrice: 0,
    };
  }

  componentDidMount() {
    // extract the query parameters
    // this.props.location.search - '?bacon=....'
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    // loop through the query params, query.entries() creates key/value pairs
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        // each entry -> ['salad', '1']
        // populate the ingreds object with they key/value pairs
        // param[0] - name
        // param[1] - value , + converts to number
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  HandleCheckoutCancel = () => {
    this.props.history.goBack();
  };

  HandleCheckoutContinue = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          CheckoutCancel={this.HandleCheckoutCancel}
          CheckoutContinue={this.HandleCheckoutContinue}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          // standard syntax
          // component={ContactData}

          // to pass props down to the component, use render method
          // with this approach, history object is unavailable, so props is passed down to the component
          // props contains the history object
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
