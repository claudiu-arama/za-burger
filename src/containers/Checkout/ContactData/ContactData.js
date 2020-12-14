import React from 'react';
import Button from '../../../components/UI/Button/Button';
import styleModule from './ContactData.module.scss';
import axios from './../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elemType: 'input',
        elemConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
      },
      street: {
        elemType: 'input',
        elemConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
      },
      zipCode: {
        elemType: 'input',
        elemConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
      },
      country: {
        elemType: 'input',
        elemConfig: {
          type: 'text',
          placeholder: 'Your Country',
        },
        value: '',
      },
      email: {
        elemType: 'input',
        elemConfig: {
          type: 'email',
          placeholder: 'Your e-Mail',
        },
        value: '',
      },
      deliveryMethod: {
        elemType: 'select',
        elemConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: '',
      },
      isLoading: false,
    },
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
        <Input elemType="" elemConfig="" value="" />
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="your email"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="your street"
        />
        <Input
          type="text"
          name="postal"
          placeholder="your postal code"
        />
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
