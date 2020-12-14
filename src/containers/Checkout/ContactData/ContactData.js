import React from 'react';
import Button from '../../../components/UI/Button/Button';
import styleModule from './ContactData.module.scss';
import axios from './../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    isLoading: false,
  };
  // handle the event object to prevent the default submit behaviour
  HandleOrderButton = (event) => {
    // stop the form from submitting
    event.preventDefault();
    //  info is sent to the server
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      // recalculate the price on the server, this is just practice
      price: this.props.price,
      customer: {
        name: 'mindy',
        address: {
          street: 'test',
          zipCode: 34213,
          country: 'Nowhere',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ isLoading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="your name" />
        <input type="email" name="email" placeholder="your email" />
        <input type="text" name="street" placeholder="your street" />
        <input type="text" name="postal" placeholder="your postal code" />
        <Button btnType="Success" clicked={this.HandleOrderButton}>
          ORDER!
        </Button>
      </form>
    );
    if (this.state.isLoading) {
      form = <Spinner />;
    }
    return (
      <div className={styleModule.ContactData}>
        <h3>Enter your Contact Data!</h3>
        {form}
      </div>
    );
  }
}

export default ContactData;
