import { Button, Grid, makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { countries, eventCategories, states } from '../../../shared/constants';
import EventFilter from '../components/EventFilter';

const useStyles = makeStyles(theme => ({
  eventSearchContainer: {
    marginLeft: theme.spacing(8),
    marginTop: theme.spacing(8)
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const EventSearch = props => {
  const classes = useStyles();

  const { searchEvents } = props;

  const [search, setSearch] = useState('');

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [category, setCategory] = useState('');

  const handleStateChange = event => {
    setState(event.target.value);
  };

  const searchSubmit = e => {
    e.preventDefault();

    searchEvents(search, country, state, category);
  };

  const searchBar = (
    <Paper
      component="form"
      className={classes.root}
      elevation={2}
      onSubmit={searchSubmit}
    >
      <InputBase
        className={classes.input}
        placeholder="Search Events "
        inputProps={{ 'aria-label': 'search events' }}
        onChange={event => setSearch(event.target.value)}
      />

      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </IconButton>
    </Paper>
  );

  return (
    <>
      <Grid
        container
        direction="column"
        spacing={4}
        className={classes.eventSearchContainer}
      >
        <Grid item>{searchBar}</Grid>

        <Grid item>
          <Grid container spacing={4}>
            <Grid item>
              <EventFilter
                filterOptions={countries}
                filterLabel="Choose a Country"
                isCountryFilter="true"
                onFilterChange={setCountry}
                filterValue={country}
              />
            </Grid>

            <Grid item>
              <EventFilter
                filterOptions={states}
                filterLabel="Choose a state"
                onFilterChange={setState}
                filterValue={state}
              />
            </Grid>

            <Grid item>
              <EventFilter
                filterOptions={eventCategories}
                filterLabel="Choose a category"
                onFilterChange={setCategory}
                filterValue={category}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EventSearch;
