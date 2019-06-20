import React, {Component} from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { Alert } from 'reactstrap';

const stripe = `http://127.0.0.1:5000/api/stripe/`

class AddCard extends Component {
    state = {
        errorMessage : "",
        source : 'tok_mastercard',
        card : undefined,
        customer : undefined,
        amount : undefined,
        redirect : false, 
    }

    redirect () {
        return <Switch><Redirect from='/addpaymentmethod' to='/username'/></Switch>
    }

    // submit() {
    //     this.setState({success:true},
    //         ()=>this.addCard()
    //     )
    // }

    getCustomer = () => {
        fetch(stripe + `customer/${this.state.customer}`)
        .then(blob => blob.json()).then(json => {
            let customer = json
            console.log(customer)
            this.setState({
                stripeCustomer : customer
            })
        })
    }


    addCard = () => {
        let post = {

        }
        fetch(stripe + `customer`, {
            method:"POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        })


        .then (blob => blob.json()).then(json => {
            let customerObject = json
            console.log(customerObject['default_source'], customerObject['id'])
            this.setState({
                card : customerObject['default_source'],
                customer : customerObject['id'],
                redirect : true,
                })
        })
    }

    // submit () {
    //     this.setState({
    //         email : document.getElementById("email").value,
    //         name : document.getElementById("first").value + " " + document.getElementById("last").value,
    //         }
    //     , ()=>this.createCustomerObject())
    // }
    
    render () {
        return(
            <div>
        <button className="paybutton" onClick = {()=>this.getCustomer()}>
        get customer
        </button>
                <form className="billcontainer">
                    <p className="title">PAYMENT INFO</p>
                    <input
                        className = "input"
                        placeholder = "Credit Card"/>
                    <input
                        className = "input"
                        placeholder = "Expiry Month"/>
                    <input
                        className = "input"
                        placeholder = "Expiry Year"/>
                    <input
                        className = "input"
                        placeholder = "CVC"/>
                    <button 
                        className = "paybutton"
                        onClick={()=>{this.submit()}}>SUBMIT
                    </button>
                </form>
                {this.state.redirect ? (this.redirect()) : (null)}
            </div>
        )
    }
}

export default AddCard