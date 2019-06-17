import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class CardPayment extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_fnTlX6Yxon8HV5zItXcsllfV00h8gA0C0Q">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default CardPayment