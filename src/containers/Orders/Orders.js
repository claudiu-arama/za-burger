import Axios from 'axios';
import React from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axiosOrders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
  state = {
    orders: [],
    isLoading: true,
  };
  // lifecycle method to get the orders from the server
  //
  componentDidMount() {
    axios
      .get('/orders.json')
      // res is a JS object with the id's as properties -> res.data =the object
      // using a for...in loop, transform the object into array
      .then((res) => {
        // create empty array
        const fetchedOrders = [];
        for (let key in res.data) {
          // push an object into the array, distribute the propertiess of the order object from firebase,
          // with the spread operator and the object id as the id
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ isLoading: false, orders: fetchedOrders });
      })
      .catch((err) => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
