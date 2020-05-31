import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import EventCard from './EventCard';

const useStyles = makeStyles(theme => ({
  eventListContainer: {
    marginTop: theme.spacing(8)
  }
}));

const EventList = props => {
  const classes = useStyles();
  const events = props.events;
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        className={classes.eventListContainer}
        spacing={6}
      >
        {events.map((event, index) => (
          <Grid item>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default EventList;
