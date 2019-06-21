import React, {Component} from 'react'
import { Redirect, Switch } from 'react-router-dom'

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
        return <Switch><Redirect from='/login' to='/username'/></Switch>
    }

    refresh () {
        return null
    }
    
    render () {
        return(
            <div>
                <form className="paybutton">
                <br/><br/><br/><br/><br/><br/><br/><br/>
                    <input 
                        className = "input"
                        id = "username"
                        placeholder = "Username"
                    >
                    </input>
                    <input 
                        className = "input"
                        type = "password"
                        id = "password"
                        placeholder = "Password"
                    >
                    </input>
                    <button 
                        className = "postbillbutton"
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