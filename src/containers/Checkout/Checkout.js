import React from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  // *************************************************************** REDUX
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ingredients: {},
  //     totalPrice: 0,
  //   };
  // }

  // *************************************************************** changed for REDUX
  // componentWillMount() {
  //   // extract the query parameters
  //   // this.props.location.search - '?bacon=....'
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   // loop through the query params, query.entries() creates key/value pairs
  //   for (let param of query.entries()) {
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       // each entry -> ['salad', '1']
  //       // populate the ingreds object with they key/value pairs
  //       // param[0] - name
  //       // param[1] - value , + converts to number
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

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
          ingredients={this.props.cktIngrds}
          CheckoutCancel={this.HandleCheckoutCancel}
          CheckoutContinue={this.HandleCheckoutContinue}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
          // standard syntax
          // component={ContactData}

          // //below replaced with above Route property 'component'
          // // to pass props down to the component, use render method
          // // with this approach, history object is unavailable, so props is passed down to the component
          // // props contains the history object
          // // render={(props) => (
          // //   <ContactData
          // //     ingredients={this.props.cktIngrds}
          // //     price={this.props.cktPrice}
          // //     {...props}
          // //   />
          // // )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cktIngrds: state.ingredients,
    cktPrice: state.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
