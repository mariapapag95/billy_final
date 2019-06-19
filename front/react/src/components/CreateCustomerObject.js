import React,{Component} from 'react'
import Dash from './Dash'

// BUILD OUT A CUSTOMER FORM TO ENTER THEIR INFORFMATION

const stripe = `http://127.0.0.1:5000/api/stripe/`

class CreateCustomerObject extends Component {
    state = {
        email : 'paying.user@example.com',
        name : undefined,
        source : 'tok_visa',
        card : undefined,
        customer : undefined,
        amount : undefined,
        redirect : false, 
        form : true,
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
                })
        })
    }

    // postCard = () => {
    //     let post = {
    //         number : '4242424242424242',
    //         exp_month: '12',
    //         exp_year: '2020',
    //         cvc: '123'
    //     }
    //     fetch(stripe + `card`, {
    //         method:"POST", 
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(post)
    //     }).then (blob => blob.json()).then(json => {
    //         let cardObject = json
    //         console.log(cardObject)
    //         // this.setState for source === card token id
    //         })
    // }

    submit () {
        this.setState({
            email : document.getElementById("email").value,
            name : document.getElementById("first").value + " " + document.getElementById("last").value,
            }
        , ()=>this.createCustomerObject())
    }

    redirect () {
        return <Dash/>
    }

    form () {
        return <div>
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
        </div>
    }

    // test = () => this.postCard()

    render () {
        let page = (this.state.redirect ? (<Dash/>) : (this.form()))
        return (
            <div>
                {page}
                {/* <button 
                className = "paybutton"
                onClick={()=>{this.test()}}>TEST
                </button> */}
            </div>
        )
    }
}

export default CreateCustomerObject