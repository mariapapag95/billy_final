import React from 'react'
//import StripeCheckout from 'react-stripe-checkout';

const url = `http://127.0.0.1:5000/api/bills`

// function onToken(token, addresses){
//     // TODO: Send the token information and any other
//     // relevant information to your payment process
//     // server, wait for the response, and update the UI
//     // accordingly. How this is done is up to you. Using
//     // XHR, fetch, or a GraphQL mutation is typical.
//     };

function payBill(id) {
        let post = {
            'amountPaid': this.state.amountPaid, 
            'paidBy': this.state.paidBy, 
            'paidTo': this.state.paidTo,
            'note': this.state.note,}
        fetch (url +`/${id}/pay`, {
            headers: {"Content-Type" : "application/json"}, 
            body: JSON.stringify(post),
            mode:"cors",
            method:"post"
        }).then (blob => blob.json()).then(json => {
            let bill = json
            console.log("this is BILL ijgkg pay(id)", bill)
        })
    }


function PayForm(props) {
    if (props.hidden === false) {
        return null
    } else {
        return(
            <div className="post">
            <form>
                <input 
                className="input"
                placeholder="Enter Amount">
                </input>
                <input 
                className="input"
                placeholder="Add Note">
                </input>
                <button 
                className="test"
                onClick={()=>{payBill()}}>
                CONFIRM PAYMENT
                </button>
            </form>
            {/* <StripeCheckout
                stripeKey="pk_test_fnTlX6Yxon8HV5zItXcsllfV00h8gA0C0Q"
                token={nothing()}
            /> */}
            </div>
        )
    }
}

export default PayForm;