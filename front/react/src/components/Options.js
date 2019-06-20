import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
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
            <div className="dropdown">USERNAME</div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Typography>
                <button className="dropdown">LOGOUT</button>
            </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
    );
}