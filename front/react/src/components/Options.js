import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import LandingPage from './LandingPage';
import { Redirect, Switch } from 'react-router-dom'
import { NavLink } from 'reactstrap';
import '../App.css'
import AddCard from './AddCard';

// const url = `http://127.0.0.1:5000/api/`

class Options extends Component {
    state = {
        redirect : false, 
        username: undefined,
        addCard : false,
    }

    redirect () {
        return <Switch><Redirect from='/username' to='/'/></Switch>
    }

    logout () {
        window.sessionStorage.setItem('customer','')
        this.setState({ redirect: true })
    }

    addCard() {
        const currentState = this.state.addCard;
        this.setState({ addCard: !currentState })
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
                    <button
                    className="dropdown"
                    onClick={()=>this.addCard()}
                    >{this.state.addCard ? "CANCEL" : "ADD PAYMENT METHOD"}
                    </button>
                </ExpansionPanelDetails>
                    <div>{this.state.addCard ? (<ExpansionPanelDetails><AddCard/></ExpansionPanelDetails>) : (null)}</div>
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