import { createMuiTheme } from '@material-ui/core';

const appBlue = '#0d47a1';
const appOrange = '#FFBA60';
const appRed = '#ff0000';

export default createMuiTheme({
  palette: {
    common: {
      blue: `${appBlue}`,
      orange: `${appOrange}`,
      red: appRed
    },
    primary: {
      main: `${appBlue}`
    },
    secondary: {
      main: `${appRed}`
    }
  },
  typography: {
    tab: {
      textTransform: 'none',
      fontWeight: '700',
      fontSize: '1rem'
    },
    submitButton: {
      fontSize: '1rem',
      textTransform: 'none',
      color: 'white'
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: `${appBlue}`,
      lineHeight: 1.5
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      color: `${appBlue}`
    },
    subtitle1: {
      fontWeight: 300,
      fontSize: '1.25rem',
      color: 'gray'
    }
  }
});
