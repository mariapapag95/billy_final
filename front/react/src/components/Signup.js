import React from 'react'
import Dash from './Dash';

function dash() {
    return (<Dash/>)
}

function Signup() {
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
                    placeholder = "Password"
                >
                </input>
                <input 
                    className = "input"
                    id = "confirm"
                    placeholder = "Confirm Password"
                >
                </input>
                <button 
                    className = "paybutton"
                    onClick = {()=>{dash()}}
                >
                    SIGNUP
                </button>
            </form>
        </div>
    )
}

export default Signup