import React from 'react'
import {NavLink} from 'reactstrap'

function LandingPage() {
    return(
        <div className="background">
        <div className="biglogo">BILLY 
        <div className="about"> Easily help friends and family pay their bills, split bills, and fundraise</div>
        </div>
        <NavLink
        style = {{textDecorationSkip: true, color: 'white'}}
        className="landing landing1"
        href="/username">
        SIGN UP
        </NavLink>
        <NavLink
        style = {{textDecorationSkip: true, color: 'white'}}
        className="landing landing2"
        href="/login">
        LOG IN
        </NavLink>
        </div>
    )
}

export default LandingPage