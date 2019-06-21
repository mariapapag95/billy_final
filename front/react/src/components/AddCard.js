import React, {Component} from 'react'
import { Redirect, Switch } from 'react-router-dom'
import img from './card.gif'
// import { Alert } from 'reactstrap';

const stripe = `http://127.0.0.1:5000/api/stripe/`
const customer = window.sessionStorage.getItem('customer')

class AddCard extends Component {
    state = {
        source : 'tok_mastercard',
        redirect : false, 
    }

    redirect () {
        return <Switch><Redirect from='/addpaymentmethod' to='/username'/></Switch>
    }

    submit() {
        this.setState({success:true},
            ()=>this.addCard()
        )
    }

    addCard = () => {
        let post = {
            source : this.state.source,
            customer : customer
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
            let newCard = json
            console.log(newCard)
            this.setState({
                redirect : true,
                })
        })
    }

    render () {
        return(
            <div>
                <div className="paycontainer">
                <img className="money_gif" width="100%" src={img} alt=""></img>
                <form>
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
                        className = "postbillbutton"
                        onClick={()=>{this.submit()}}>SUBMIT
                    </button>
                </form>
                {this.state.redirect ? (this.redirect()) : (null)}
            </div>
            </div>
        )
    }
}

export default AddCard