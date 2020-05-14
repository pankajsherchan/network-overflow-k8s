import { makeStyles, useTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { Link } from 'react-router-dom';
import customSoftwareIcon from '../../assets/customSoftwareIcon.svg';
import Flag from '../../assets/nepaliflag.png';
import websiteIcon from '../../assets/websiteIcon.svg';
import ButtonArrow from '../../components/ui/buttonArrow/ButtonArrow';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    marginTop: '2em'
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
  learnMoreServiceButton: {
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    border: 'solid',
    borderWidth: 2,
    borderRadius: 40,
    fontWeight: 700,
    height: 35,
    fontSize: '0.7rem',
    marginTop: '1em'
  },
  icon: {
    marginLeft: '2em',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0
    }
  },
  serviceContainer: {
    marginTop: '8em'
  }
}));

const Home = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
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
                Bringing Nepali from all over the world
                <br />
                to one place
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
                    Sign Up
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
      {/* SERVICES - JOBS */}
      <Grid
        container
        direction="row"
        justify={matchesSM ? 'center' : undefined}
        className={classes.serviceContainer}
      >
        <Grid item style={{ marginLeft: matchesSM ? undefined : '5em' }}>
          <Typography variant="h4">Jobs</Typography>

          <Typography variant="subtitle1">Jobs related text</Typography>

          <Typography variant="subtitle1">Jobs related another text</Typography>

          <Button
            variant="outline"
            className={classes.learnMoreServiceButton}
            component={Link}
            to="/jobs"
          >
            <span style={{ marginRight: 5 }}>Browse Jobs</span>
            <ButtonArrow
              width={15}
              height={15}
              fill={theme.palette.common.blue}
            />
          </Button>
        </Grid>

        <Grid item>
          <img
            className={classes.icon}
            src={customSoftwareIcon}
            alt="custom software"
          />
        </Grid>
      </Grid>

      {/* SERVICES - Roommates */}
      <Grid
        container
        direction="row"
        justify={matchesSM ? 'center' : 'flex-end'}
        className={classes.serviceContainer}
      >
        <Grid item>
          <Typography variant="h4">Roommates</Typography>

          <Typography variant="subtitle1">
            Pariatur eiusmod exercitation labore ipsum nostrud ut labore
          </Typography>

          <Typography variant="subtitle1">
            loremConsequat dolor eu eu consequat do deserunt consequat eu
            laboris pariatur irure esse ut.
          </Typography>

          <Button
            variant="outline"
            className={classes.learnMoreServiceButton}
            component={Link}
            to="/roommates"
          >
            <span style={{ marginRight: 5 }}>Find Roommates </span>
            <ButtonArrow
              width={15}
              height={15}
              fill={theme.palette.common.blue}
            />
          </Button>
        </Grid>

        <Grid item style={{ marginRight: matchesSM ? undefined : '5em' }}>
          <img
            className={classes.icon}
            src={customSoftwareIcon}
            alt="custom software"
          />
        </Grid>
      </Grid>

      {/* SERVICES - Events */}
      <Grid
        container
        direction="row"
        justify={matchesSM ? 'center' : undefined}
        className={classes.serviceContainer}
      >
        <Grid item style={{ marginLeft: matchesSM ? undefined : '5em' }}>
          <Typography variant="h4">Events</Typography>

          <Typography variant="subtitle1">
            Fugiat veniam in laboris ad.
          </Typography>

          <Typography variant="subtitle1">
            Quis eiusmod voluptate occaecat ullamco ea minim excepteur laboris
            aute sit.
          </Typography>

          <Button
            variant="outline"
            className={classes.learnMoreServiceButton}
            style={{ marginRight: 5 }}
            component={Link}
            to="/events"
          >
            <span>Browse Events</span>
            <ButtonArrow
              width={15}
              height={15}
              fill={theme.palette.common.blue}
            />
          </Button>
        </Grid>

        <Grid item>
          <img className={classes.icon} src={websiteIcon} alt="website icon" />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
