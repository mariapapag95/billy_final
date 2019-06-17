import React, {Component} from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import Dash from './Dash';

class Login extends Component {
    state = {
        login : undefined,
        errorMessage : ""
    }

    login = () => {
        this.setState({login : true})
    }

    badlogin = () => {
        this.setState({login : false})
    }

    redirect () {
        console.log("HELO")
        return <Switch><Redirect from='/login' to='/username'/></Switch>
    }

    refresh () {
        console.log("login = false")
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
                    <button 
                        className = "paybutton"
                        onClick = {()=>{this.login()}}
                    >
                        LOGIN SUCESSFUL
                    </button>
                    <button 
                        className = "paybutton"
                        onClick = {()=>{this.badlogin()}}
                    >
                        LOGIN UNSUCESSFUL
                    </button>
                </form>
                    {this.state.login===true ? 
                        (this.redirect()) : (this.refresh())}
            </div>
        )
    }
}

export default Login