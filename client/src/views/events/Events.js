import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import Flag from '../../assets/nepaliflag.png';
import ButtonArrow from '../../components/ui/buttonArrow/ButtonArrow';
import withErrorAndLoadingHandlerHOC from '../../hoc/ErrorAndLoadingHandlerHOC';
import Events from './containers/Events';

const useStyles = makeStyles(theme => ({
  eventContainer: {
    marginTop: theme.spacing(8)
  },
  buttonContainer: {
    marginTop: '2em'
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
  }
}));

const EventView = () => {
  const classes = useStyles();

  const theme = useTheme();

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
                    className={classes.createEventButton}
                    component={Link}
                    to="/createEvent"
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

      <Divider />

      <Events> </Events>
    </>
  );
};
export default withErrorAndLoadingHandlerHOC(EventView);
