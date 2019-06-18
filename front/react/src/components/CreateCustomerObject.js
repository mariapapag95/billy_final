import React,{Component} from 'react'

// BUILD OUT A CUSTOMER FORM TO ENTER THEIR INFORFMATION

const stripe = `http://127.0.0.1:5000/api/stripe/customer`

class CreateCustomerObject extends Component {
    state = {
        description : undefined
    }

    createCustomerObject = () => {
        let post = {
            description: this.state.description}
        fetch(stripe, {
            method:"POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        })
        .then (blob => blob.json()).then(json => {
            let customerObject = json
            console.log(customerObject)
            })
    }

    submit () {
        this.setState({description : document.getElementById("description").value}
        , ()=>this.createCustomerObject())
    }

    render () {
        return (
            <div>
                <input 
                id = "description">
                </input>
                <button onClick={()=>{this.submit()}}>SUBMIT</button>
            </div>
        )
    }
}

export default CreateCustomerObject