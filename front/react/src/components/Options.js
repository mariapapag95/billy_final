import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    }));

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
                <button className="dropdown">ADD PAYMENT METHOD</button>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
                <button className="dropdown">LOGOUT</button>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
    );
}