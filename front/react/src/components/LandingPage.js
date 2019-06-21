import React from 'react'

function LandingPage() {
    return(
        <div className="background">
        <div className="biglogo">BILLY</div>
        <div className="about"> Easily help friends and family pay their bills, split bills, and fundraise</div>
        <div className="about">
        <br/>
        <br/>
        <a 
        href="/username"
        className="logintext"
        >SIGN UP</a>
        <br/>
        <br/>
        <a 
        className="logintext"
        href="/signup"
        >LOGIN</a>
        </div>
        </div>
    )
}

export default LandingPage