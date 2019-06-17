import React, {Component} from 'react'
import { Redirect, Switch } from 'react-router-dom'

class Signup extends Component {
    state = {
        signup : undefined,
        errorMessage : ""
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

    refresh () {
        console.log("signup = false")
        return null
    }
    
    render () {
        return(
            <div>
                <form>
                    <input 
                        className = "input"
                        id = "username"
                        placeholder = "Username"
                    >
                    </input>
                    <input 
                        className = "input"
                        id = "password"
                        placeholer = "Password"
                    >
                    </input>
                    <input 
                        className = "input"
                        id = "confirm"
                        placeholer = "Confirm Password"
                    >
                    </input>
                    <button 
                        className = "paybutton"
                        onClick = {()=>{this.signup()}}
                    >
                        signup SUCESSFUL
                    </button>
                    <button 
                        className = "paybutton"
                        onClick = {()=>{this.badsignup()}}
                    >
                        signup UNSUCESSFUL
                    </button>
                </form>
                    {this.state.signup===true ? 
                        (this.redirect()) : (this.refresh())}
            </div>
        )
    }
}

export default Signup