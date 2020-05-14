import {
  Button,
  IconButton,
  makeStyles,
  SwipeableDrawer,
  Tab,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import globeIcon from '../../../assets/globe.svg';

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    // eslint-disable-next-line dot-notation
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1em'
    }
  },
  logo: {
    height: '6em',
    // eslint-disable-next-line dot-notation
    [theme.breakpoints.down('md')]: {
      height: '5.5em'
    }
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px'
  },
  button: {
    ...theme.typography.submitButton,
    backgroundColor: theme.palette.common.red,
    borderRadius: 50,
    width: 130,
    height: 40,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: 0
  },
  menuItem: {
    ...theme.typography.tab,
    '&:hover': {
      opacity: 1
    },
    opacity: 0.8
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  drawerIcon: {
    height: '50px',
    width: '50px'
  },
  drawer: {
    background: theme.palette.common.blue,
    minWidth: '150px'
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1
    }
  },
  drawerSignUp: {
    backgroundColor: theme.palette.common.orange
  },
  drawerMargin: {
    // eslint-disable-next-line dot-notation
    [theme.breakpoints.down('md')]: {
      marginBottom: '5em'
    }
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1
  }
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

const Header = props => {
  const {
    selectedRouteIndex,
    setSelectedRouteIndex,
    selectedServiceRouteIndex,
    setSelectedServiceRouteIndex
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleTabChange = (e, newValue) => {
    setSelectedRouteIndex(newValue);
  };

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, index) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedServiceRouteIndex(index);
  };

  const serviceMenuRouteOptions = [
    {
      name: 'Services',
      link: '/services',
      activeIndex: 1,
      selectedSecondaryRouteIndex: 0
    },
    {
      name: 'Jobs',
      link: '/jobs',
      activeIndex: 1,
      selectedSecondaryRouteIndex: 1
    },
    {
      name: 'Roommates',
      link: '/roommates',
      activeIndex: 1,
      selectedSecondaryRouteIndex: 2
    },
    {
      name: 'Events',
      link: '/events',
      activeIndex: 1,
      selectedSecondaryRouteIndex: 3
    }
  ];

  const routes = [
    {
      name: 'Home',
      link: '/',
      activeIndex: 0
    },
    {
      name: 'Services',
      link: '/services',
      ariaOwns: anchorEl ? 'simple-menu' : undefined,
      ariaPopup: anchorEl ? true : undefined,
      mouseOver: event => handleClick(event),
      activeIndex: 1
    },
    {
      name: 'About Us',
      link: '/about',
      activeIndex: 2
    },
    {
      name: 'Contact Us',
      link: '/contact',
      activeIndex: 3
    },
    {
      name: 'Sign Up',
      link: '/signup',
      activeIndex: 4,
      isButton: true
    }
  ];

  useEffect(() => {
    [...routes, ...serviceMenuRouteOptions].forEach(route => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (selectedRouteIndex !== route.activeIndex) {
            setSelectedRouteIndex(route.activeIndex);

            if (
              route.selectedSecondaryRouteIndex &&
              route.selectedSecondaryRouteIndex !== selectedServiceRouteIndex
            ) {
              setSelectedServiceRouteIndex(route.selectedSecondaryRouteIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [
    selectedRouteIndex,
    selectedServiceRouteIndex,
    serviceMenuRouteOptions,
    routes
  ]);

  const tabs = (
    // eslint-disable-next-line react/jsx-fragments
    <React.Fragment>
      <Tabs
        value={selectedRouteIndex}
        onChange={handleTabChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index) => {
          if (route.isButton) {
            return (
              <Button
                // eslint-disable-next-line react/no-array-index-key
                key={`${route}${index}`}
                variant="contained"
                color="secondary"
                className={classes.button}
                component={Link}
                to={route.link}
              >
                {route.name}
              </Button>
            );
          }

          return (
            <Tab
              // eslint-disable-next-line react/no-array-index-key
              key={`${route}${index}`}
              label={route.name}
              className={classes.tab}
              component={Link}
              to={route.link}
              aria-owns={route.ariaOwns}
              aria-haspopup={route.ariaPopup}
              onMouseOver={route.mouseOver}
              onFocus={route.mouseOver} // same function as mouseOver on focus
            />
          );
        })}
      </Tabs>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        keepMounted
        style={{ zIndex: 1302 }}
      >
        {serviceMenuRouteOptions.map((menu, index) => (
          <MenuItem
            onClick={event => {
              handleMenuItemClick(event, index);
              setSelectedRouteIndex(1);
            }}
            component={Link}
            to={menu.link}
            classes={{ root: classes.menuItem }}
            selected={
              index === selectedServiceRouteIndex && selectedRouteIndex === 1
            }
            key={`${menu}`}
          >
            {menu.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    // eslint-disable-next-line react/jsx-fragments
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.drawerMargin} />
        <List disablePadding>
          {routes.map(route => {
            if (route.isButton) {
              return (
                <ListItem
                  key={`${route}`}
                  divider
                  button
                  component={Link}
                  to={route.link}
                  onClick={() => {
                    setOpenDrawer(false);
                    setSelectedRouteIndex(route.activeIndex);
                  }}
                  selected={selectedRouteIndex === route.activeIndex}
                  classes={{
                    root: classes.drawerSignUp,
                    selected: classes.drawerItemSelected
                  }}
                >
                  <ListItemText
                    className={classes.drawerItemSelected}
                    disableTypography
                  >
                    {route.name}
                  </ListItemText>
                </ListItem>
              );
            }

            return (
              <ListItem
                key={`${route}`}
                divider
                button
                component={Link}
                to={route.link}
                onClick={() => {
                  setOpenDrawer(false);
                  setSelectedRouteIndex(route.activeIndex);
                }}
                selected={selectedRouteIndex === route.activeIndex}
                classes={{ selected: classes.drawerItemSelected }}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </SwipeableDrawer>

      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <ElevationScroll>
        <AppBar className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logoContainer}
              onClick={() => setSelectedRouteIndex(0)}
            >
              {/* <img src={networkOverflow} alt="Logo" className={classes.logo} /> */}
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                style={{
                  color: 'white',
                  marginLeft: '20px',
                  fontSize: '1.5em',
                  margin: 'auto'
                }}
              >
                <img
                  src={globeIcon}
                  alt="main logo"
                  width="50"
                  height="50"
                  style={{ backgroundColor: 'white' }}
                />
                Network Overflow
              </Typography>
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </div>
  );
};

Header.propTypes = {
  selectedRouteIndex: PropTypes.number.isRequired,
  setSelectedRouteIndex: PropTypes.func.isRequired,
  selectedServiceRouteIndex: PropTypes.number.isRequired,
  setSelectedServiceRouteIndex: PropTypes.func.isRequired
};

export default Header;
