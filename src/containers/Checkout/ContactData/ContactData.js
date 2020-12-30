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
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elemType: 'input',
        elemConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elemType: 'input',
        elemConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elemType: 'input',
        elemConfig: {
          type: 'text',
          placeholder: 'Your Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elemType: 'input',
        elemConfig: {
          type: 'email',
          placeholder: 'Your e-Mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elemType: 'select',
        elemConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    isLoading: false,
    formIsValid: false,
  };

  // fix validation flaw: isValid intial value 'true'
  // and check isValid in every if check
  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  HandleOrderButton = (event) => {
    // handle the event object to prevent the default submit behaviour
    // stop the form from submitting
    event.preventDefault();
    this.setState({ isLoading: true });
    // created key/value pairs - formData gets new properties (name, address..)
    // values are the input values provided by the user
    const formData = {};
    for (let orderElem in this.state.orderForm) {
      formData[orderElem] = this.state.orderForm[orderElem].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      // recalculate the price on the server, this is just practice
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ isLoading: false });
        // after the order is posted on the server, go back to root
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  HandleTextInput = (event, inputId) => {
    const updatedFormData = {
      ...this.state.orderForm,
    };

    const updatedFormElem = {
      ...updatedFormData[inputId],
    };

    updatedFormElem.value = event.target.value;
    updatedFormData[inputId] = updatedFormElem;

    //  update valid property, call checkvalidity method
    // method returns true/false
    updatedFormElem.valid = this.checkValidity(
      updatedFormElem.value,
      updatedFormElem.validation
    );
    updatedFormElem.touched = true;

    // check overall form validity
    // loop through all inputId's and check validity && general validity
    let formIsValid = true;

    for (let inputId in updatedFormData) {
      formIsValid = updatedFormData[inputId].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedFormData,
      formIsValid: formIsValid,
    });
  };

  render() {
    // transform the state.orderForm object into an array
    const formElemArray = [];
    for (let key in this.state.orderForm) {
      formElemArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.HandleOrderButton}>
        {formElemArray.map((formElem) => (
          <Input
            elemType={formElem.config.elemType}
            elemConfig={formElem.config.elemConfig}
            value={formElem.config.value}
            key={formElem.id}
            inValid={!formElem.config.valid}
            shouldValidate={formElem.config.validation}
            touched={formElem.config.touched}
            textInput={(event) =>
              this.HandleTextInput(event, formElem.id)
            }
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
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
