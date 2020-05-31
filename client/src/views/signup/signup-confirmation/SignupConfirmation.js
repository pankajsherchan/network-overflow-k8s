import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { environment } from '../../../environments/environment';
import withErrorAndLoadingHandlerHOC from '../../../hoc/ErrorAndLoadingHandlerHOC';
import useHttpHook from '../../../hooks/HttpHook';
import SimpleDialog from '../../../shared/dialog/SimpleDialog';

const useStyles = makeStyles(theme => ({
  signinContainer: {
    marginTop: theme.spacing(8)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonContainer: {
    marginTop: theme.spacing(2)
  },
  forgotPasswordButton: {
    ...theme.typography.submitButton,
    backgroundColor: theme.palette.common.red,
    borderRadius: 50,
    height: 45,
    marginRight: 40,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  },
  signinLink: {
    color: theme.palette.common.blue,
    fontSize: '1em',
    fontWeight: 700,
    marginLeft: 40
  },
  formError: {
    color: 'red'
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const SignupConfirmation = props => {
  const classes = useStyles();

  const [tokenId, setTokenId] = useState(props.match.params.tokenId);
  const [email, setEmail] = useState(); // receive from the token data
  const [verified, setVerified] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const { error, isLoading, clearError, sendRequest } = useHttpHook();

  useEffect(() => {
    const userVerificationCall = async () => {
      const url = `${environment.apiUrl}${environment.apis.userVerification}/${tokenId}`;
      const response = await sendRequest(url, 'GET');
      if (response) {
        // showDialogBox('Success', 'User added successfully');
        setVerified(true);
        setEmail(response.data.tokenData);
      }
    };

    userVerificationCall();
  }, [tokenId]);

  const hideDialogBox = () => {
    setShowDialog(false);
    setDialogMessage(null);
  };

  const showDialogBox = (title, message) => {
    setShowDialog(true);
    setDialogMessage(message);
    setDialogTitle(title);
  };

  return (
    <Container maxWidth="xs">
      {showDialog ? (
        <SimpleDialog
          message={dialogMessage}
          title={dialogTitle}
          hide={hideDialogBox}
        ></SimpleDialog>
      ) : null}

      {verified ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.signinContainer}
        >
          <Typography variant="h4">User Verified</Typography>
        </Grid>
      ) : null}
    </Container>
  );
};

export default withErrorAndLoadingHandlerHOC(SignupConfirmation);
