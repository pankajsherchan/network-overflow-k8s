import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { environment } from '../../../environments/environment';
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

const VerifyForgotPassword = props => {
  const classes = useStyles();

  const [tokenId, setTokenId] = useState(props.match.params.tokenId);
  const [email, setEmail] = useState(); // receive from the token data
  const [verified, setVerified] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const { error, isLoading, clearError, sendRequest } = useHttpHook();

  const verifyForgotPasswordSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .matches(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$', // 1 capital letter, 1 small letter, 1 number, 1 special character, minimum 6 character long
        {
          message: 'Password complexity not met'
        }
      ),
    confirmPassword: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .matches(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$', // 1 capital letter, 1 small letter, 1 number, 1 special character, minimum 6 character long
        {
          message: 'Password complexity not met'
        }
      )
      .when('password', {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'Both password need to be the same'
        )
      })
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: verifyForgotPasswordSchema,
    onSubmit: async user => {
      changePassword(user);
    }
  });

  const changePassword = async user => {
    const postObj = { password: user.password, email };

    const url = `${environment.apiUrl}${environment.apis.changePassword}`;
    const response = await sendRequest(url, 'POST', postObj, {});

    if (response) {
      showDialogBox('Success', 'Password changed successfully');
    }
  };

  useEffect(() => {
    const forgotPasswordVerificationCall = async () => {
      const url = `${environment.apiUrl}${environment.apis.forgotPassword}/${tokenId}`;
      console.log('url: inside the use effect ', url);
      const response = await sendRequest(url, 'GET');
      console.log('response: ', response);
      if (response) {
        // showDialogBox('Success', 'User added successfully');
        setVerified(true);
        setEmail(response.data.tokenData);
      }
    };

    forgotPasswordVerificationCall();
  }, [tokenId]);

  const hideDialogBox = () => {
    setShowDialog(false);
    clearError();
  };

  const showDialogBox = (title, message) => {
    setShowDialog(true);
    setDialogMessage(message);
    setDialogTitle(title);
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.spinnerContainer}>
        {isLoading ? <CircularProgress /> : null}
      </div>

      {showDialog ? (
        <SimpleDialog
          open={showDialog}
          message={dialogMessage}
          title={dialogTitle}
          hide={hideDialogBox}
        ></SimpleDialog>
      ) : null}

      {error ? (
        <SimpleDialog
          hide={hideDialogBox}
          title={error.status}
          message={error.message}
        ></SimpleDialog>
      ) : null}

      {verified ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.signinContainer}
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4">Change Password</Typography>

          <form
            onSubmit={formik.handleSubmit}
            className={classes.form}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              type="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched('password', true)}
            />

            {formik.errors.password && formik.touched.password ? (
              <div className={classes.formError}>{formik.errors.password}</div>
            ) : null}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              autoComplete="confirmPassword"
              autoFocus
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched('confirmPassword', true)}
            />

            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <div className={classes.formError}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}

            <Grid
              container
              className={classes.buttonContainer}
              direction="row"
              alignItems="center"
              justify="flex-start"
            >
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.forgotPasswordButton}
                  disabled={!formik.isValid}
                >
                  Submit
                </Button>
              </Grid>

              <Grid item>
                <Link
                  href="/signin"
                  variant="body2"
                  className={classes.signinLink}
                >
                  Back to Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      ) : null}
    </Container>
  );
};

export default VerifyForgotPassword;
