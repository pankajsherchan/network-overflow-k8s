import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  expansionPanel: {
    backgroundColor: theme.palette.common.blue,
    color: 'white'
  }
}));

const EventDetail = props => {
  const classes = useStyles();
  const [eventId, setEventId] = useState(props.match.params.eventId);
  const [eventDetail, setEventDetail] = useState(props.location.state.event);

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <>
      <h2>{eventDetail.title}</h2>

      <h4> {eventDetail.hashtags} </h4>

      <ExpansionPanel expanded="true">
        <ExpansionPanelSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.expansionPanel}
        >
          <Typography className={classes.heading}>Event Details</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{eventDetail.description}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded="true">
        <ExpansionPanelSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.expansionPanel}
        >
          <Typography className={classes.heading}>Organizer</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{eventDetail.organizer}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded="true">
        <ExpansionPanelSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.expansionPanel}
        >
          <Typography className={classes.heading}>When</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {new Date(eventDetail.date).toLocaleDateString(
              'en-US',
              dateOptions
            )}{' '}
            {eventDetail.startTime}
            {eventDetail.endTime}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default EventDetail;
