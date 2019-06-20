import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import LandingPage from './LandingPage';
import { Redirect, Switch } from 'react-router-dom'
import { NavLink } from 'reactstrap';
import '../App.css'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    }));

function logout () {
    return <LandingPage/>
}

export default function Options() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <ExpansionPanel>
            <ExpansionPanelSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <div className="dropdown_title">USERNAME</div>
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
                onClick={()=>{logout()}}
                >LOGOUT
                </button>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
    );
}