import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';

class Pay extends Component {
    onToken = (token, addresses) => {
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
    };

    render() {
        return(
            <StripeCheckout
            stripeKey="pk_test_fnTlX6Yxon8HV5zItXcsllfV00h8gA0C0Q"
            token={this.onToken}
            />
        )
    }
}

export default Pay