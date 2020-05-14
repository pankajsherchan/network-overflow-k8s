import { Button, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Flag from '../../assets/nepaliflag.png';
import ButtonArrow from '../../components/ui/buttonArrow/ButtonArrow';
import { countries, eventCategories, states } from '../../shared/constants';
import EventCard from './components/EventCard';
import EventFilter from './components/EventFilter';
import SearchBar from './components/SearchBar';

const useStyles = makeStyles(theme => ({
  eventContainer: {
    marginTop: theme.spacing(8)
  },
  buttonContainer: {
    marginTop: '2em'
  },
  eventItem: {
    margin: theme.spacing(4)
  },
  signup: {
    ...theme.typography.submitButton,
    backgroundColor: theme.palette.common.red,
    borderRadius: 50,
    height: 45,
    width: 150,
    marginRight: 40,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  },
  learnMoreButton: {
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    border: 'solid',
    borderWidth: 2,
    borderRadius: 50,
    fontWeight: 700,
    height: 45,
    width: 150
  },
  createEventButton: {
    ...theme.typography.submitButton,
    backgroundColor: theme.palette.common.red,
    borderRadius: 50,
    height: 45,
    marginRight: 40,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  },
  eventFilterContainer: {
    marginTop: theme.spacing(8)
  },
  eventFilterItem: {
    marginRight: theme.spacing(4)
  },
  searchBarContainer: {
    marginTop: theme.spacing(4)
  },
  chipFilterContainer: {
    marginTop: theme.spacing(4)
  },
  chipFilterItem: {
    marginRight: theme.spacing(4)
  },
  searchBar: {
    marginLeft: theme.spacing(4)
  }
}));

const Events = () => {
  const classes = useStyles();

  const theme = useTheme();

  const handleDelete = () => {};
  const handleClick = () => {};

  const initialChipList = ['United States', 'Louisiana', 'Free'];
  const [chipList, setChipList] = useState(initialChipList);

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Grid
            container
            alignItems="center"
            justify="flex-end"
            direction="row"
          >
            <Grid item sm>
              <Typography align="center" variant="h2">
                Find Whats happening near you
                <br />
                Lets Have Fun
              </Typography>

              <Grid
                container
                className={classes.buttonContainer}
                justify="center"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    className={classes.signup}
                    component={Link}
                    to="/signup"
                  >
                    Create Event
                  </Button>
                  <Button variant="outline" className={classes.learnMoreButton}>
                    <span style={{ marginRight: 5 }}>Learn More </span>
                    <ButtonArrow
                      width={15}
                      height={15}
                      fill={theme.palette.common.blue}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item sm>
              <img src={Flag} alt="nepali flag" height={400} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* SEARCH AND FILTER SECTION */}
      <Grid container justify="center" className={classes.eventFilterContainer}>
        <Grid item className={classes.eventFilterItem}>
          <EventFilter
            filterOptions={countries}
            filterLabel="Choose a Country"
            isCountryFilter="true"
          />
        </Grid>

        <Grid item className={classes.eventFilterItem}>
          <EventFilter filterOptions={states} filterLabel="Choose a State" />
        </Grid>

        <Grid item className={classes.eventFilterItem}>
          <EventFilter
            filterOptions={eventCategories}
            filterLabel="Categories"
          />
        </Grid>

        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.chipFilterContainer}
        >
          {chipList.map(chip => (
            <Grid item className={classes.chipFilterItem}>
              <Chip
                label={chip}
                clickable
                color="primary"
                onClick={handleClick}
                onDelete={handleDelete}
              />
            </Grid>
          ))}

          <Grid item className={classes.searchBar}>
            <SearchBar />
          </Grid>
        </Grid>
      </Grid>

      <Grid container className={classes.eventContainer} justify="center">
        <Grid item className={classes.eventItem}>
          <EventCard />
        </Grid>

        <Grid item className={classes.eventItem}>
          <EventCard />
        </Grid>

        <Grid item className={classes.eventItem}>
          <EventCard />
        </Grid>

        <Grid item className={classes.eventItem}>
          <EventCard />
        </Grid>
      </Grid>
    </>
  );
};
export default Events;
