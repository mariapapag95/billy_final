import React, {Component} from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
// import Dash from './Dash';

class Login extends Component {
    state = {
        login : false,
    }

    redirect = () => {
        if (this.state.login) {
            return <Redirect to='/username' />
        }
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
                        onClick = {()=>{this.setState({login : true})}}
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        )
    }
}

export default Login