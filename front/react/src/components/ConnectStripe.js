import React from 'react'
import {NavLink} from 'reactstrap'

const url = "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_FExmgkTgTfa854CTiLQXS40F3Z9DkS2s&scope=read_write"

function ConnectStripe() {
        return (
            <div>
                <br/>
                <br/>
                <NavLink 
                className="test"
                href={url}>
                Connect Stripe Account
                </NavLink>
                <br/>
                <br/>
            </div>
        )
    }

export default ConnectStripe