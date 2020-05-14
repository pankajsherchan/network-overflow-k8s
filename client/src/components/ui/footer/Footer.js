import { Grid, makeStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import facebook from '../../../assets/facebook.svg';
import instagram from '../../../assets/instagram.svg';
import twitter from '../../../assets/twitter.svg';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: '100%'
  },
  mainContainer: {},
  link: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.75em',
    textDecoration: 'none'
  },
  gridItem: {
    margin: '3em'
  },
  icon: {
    height: '4em',
    width: '4em',
    [theme.breakpoints.down('xs')]: {
      height: '2.5em',
      width: '2.5em'
    }
  },
  socialContainer: {}
}));

const Footer = props => {
  const classes = useStyles();
  const { setSelectedRouteIndex, setSelectedServiceRouteIndex } = props;
  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid container justify="center" className={classes.mainContainer}>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.link}
                component={Link}
                to="/"
                onClick={() => setSelectedRouteIndex(0)}
              >
                Home
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.link}
                component={Link}
                to="/services"
                onClick={() => {
                  setSelectedRouteIndex(1);
                  setSelectedServiceRouteIndex(0);
                }}
              >
                Services
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to="/jobs"
                onClick={() => {
                  setSelectedRouteIndex(1);
                  setSelectedServiceRouteIndex(1);
                }}
              >
                Jobs
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to="/roommates"
                onClick={() => {
                  setSelectedRouteIndex(1);
                  setSelectedServiceRouteIndex(2);
                }}
              >
                Roommates
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to="/events"
                onClick={() => {
                  setSelectedRouteIndex(1);
                  setSelectedServiceRouteIndex(3);
                }}
              >
                Events
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.link}
                component={Link}
                to="/about"
                onClick={() => {
                  setSelectedRouteIndex(2);
                }}
              >
                About Us
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to="/team"
                onClick={() => {
                  setSelectedRouteIndex(2);
                }}
              >
                Team
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.link}
                component={Link}
                to="/contact"
                onClick={() => {
                  setSelectedRouteIndex(3);
                }}
              >
                Contact Us
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Grid
        container
        justify="flex-end"
        spacing={2}
        className={classes.socialContainer}
      >
        <Grid
          item
          component={'a'}
          href="https://www.facebook.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src={facebook} alt="Facebook logo" className={classes.icon} />
        </Grid>
        <Grid
          item
          component={'a'}
          href="https://www.instagram.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src={instagram} alt="Instagram logo" className={classes.icon} />
        </Grid>
        <Grid
          item
          component={'a'}
          href="https://www.twitter.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src={twitter} alt="Twitter logo" className={classes.icon} />
        </Grid>
      </Grid>
    </footer>
  );
};

Footer.propTypes = {
  setSelectedRouteIndex: PropTypes.func.isRequired,
  setSelectedServiceRouteIndex: PropTypes.func.isRequired
};

export default Footer;
