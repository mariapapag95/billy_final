import React, {Component} from 'react'
import { Redirect, Switch } from 'react-router-dom'

const stripe = `http://127.0.0.1:5000/api/stripe/`

class Signup extends Component {
    state = {
        signup : undefined,
        errorMessage : "",
        email : 'paying.user@example.com',
        name : undefined,
        source : 'tok_visa',
        card : undefined,
        custotmer : undefined,
        amount : undefined,
        redirect : false, 
    }

    signup = () => {
        this.setState({signup : true})
    }

    badsignup = () => {
        this.setState({signup : false})
    }

    redirect () {
        console.log("HELO")
        return <Switch><Redirect from='/signup' to='/username'/></Switch>
    }

    createCustomerObject = () => {
        let post = {
            email : this.state.email,
            name : this.state.name,
            source : this.state.source
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

    submit () {
        this.setState({
            email : document.getElementById("email").value,
            name : document.getElementById("first").value + " " + document.getElementById("last").value,
            }
        , ()=>this.createCustomerObject())
    }
    
    render () {
        return(
            <div>
                <form className="billcontainer">
                    <p className="title">PERSONAL INFO</p>
                    <input 
                        className = "input"
                        id = "first"
                        placeholder = "First Name"/>
                    <input 
                        className = "input"                
                        id = "last"
                        placeholder = "Last Name"/>
                    <input 
                        className = "input"
                        id = "email"
                        placeholder = "Email"/>
                    <input 
                        className = "input"
                        id = "username"
                        placeholder = "Username"/>
                    <input 
                        className = "input"
                        id = "password"
                        placeholder = "Password"/>
                    <input 
                        className = "input"
                        id = "confirm"
                        placeholder = "Confirm Password"/>
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
                    <button 
                        className = "paybutton"
                        onClick = {()=>{this.signup()}}>
                        signup SUCESSFUL
                    </button>
                    <button 
                        className = "paybutton"
                        onClick = {()=>{this.badsignup()}}>
                        signup UNSUCESSFUL
                    </button>
                </form>
                    {this.state.signup===true ? (this.redirect()) : (null)}
                    {this.state.redirect ? (this.redirect()) : (null)}
            </div>
        )
    }
}

export default Signup