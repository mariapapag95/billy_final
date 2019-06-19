import React from 'react' 

function SignupForm () {
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
        </div>
    )
}

export default SignupForm()