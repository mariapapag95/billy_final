import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import LandingPage from './LandingPage';
import { Redirect, Switch } from 'react-router-dom'
import { NavLink } from 'reactstrap';
import '../App.css'

// const url = `http://127.0.0.1:5000/api/`

class Options extends Component {
    state = {
        redirect : false, 
        username: undefined,
    }

    redirect () {
        return <Switch><Redirect from='/username' to='/'/></Switch>
    }

    logout () {
        window.sessionStorage.setItem('customer','')
        this.setState({ redirect: true })
    }

    render () {
        return (
            <div>
            <ExpansionPanel>
                <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <div className="dropdown_title">MARIA</div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <NavLink
                    className="dropdown"
                    href='/addpaymentmethod'
                    >ADD PAYMENT METHOD
                    </NavLink>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <button 
                    className="dropdown"
                    onClick={()=>{this.logout()}}
                    >LOGOUT
                    </button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            {this.state.redirect ? (this.redirect()) : (null)}
            </div>
        );
    }
}

export default Options