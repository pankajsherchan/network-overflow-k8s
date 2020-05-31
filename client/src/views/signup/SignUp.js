import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { environment } from '../../environments/environment';
import withErrorAndLoadingHandlerHOC from '../../hoc/ErrorAndLoadingHandlerHOC';
import useHttpHook from '../../hooks/HttpHook';
import SimpleDialog from '../../shared/dialog/SimpleDialog';

const useStyles = makeStyles(theme => ({
  signupContainer: {
    marginTop: theme.spacing(8),
    width: 420
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.common.red
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  buttonContainer: {
    marginTop: theme.spacing(2)
  },
  signupButton: {
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

const SignUp = () => {
  const classes = useStyles();

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const { sendRequest } = useHttpHook();

  const signupSchema = Yup.object({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .matches(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$', // 1 capital letter, 1 small letter, 1 number, 1 special character, minimum 6 character long
        {
          message: 'Password complexity not met'
        }
      )
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    },
    validationSchema: signupSchema,
    onSubmit: async user => {
      signup(user);
    }
  });

  const signup = async user => {
    const url = `${environment.apiUrl}${environment.apis.signup}`;
    const response = await sendRequest(url, 'POST', user, {});

    if (response.data) {
      showDialogBox('Success', 'User added successfully');
    }
  };

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
    <>
      {/* // centers the content horizontally */}
      <Container maxWidth="xs">
        {showDialog ? (
          <SimpleDialog
            message={dialogMessage}
            title={dialogTitle}
            hide={hideDialogBox}
          ></SimpleDialog>
        ) : null}
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.signupContainer}
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4">Sign Up</Typography>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('firstName', true)} // otherwise touched object in form won't populate
                />

                {formik.errors.firstName && formik.touched.firstName ? (
                  <div className={classes.formError}>
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('lastName', true)}
                />

                {formik.errors.lastName && formik.touched.lastName ? (
                  <div className={classes.formError}>
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('username', true)}
                />

                {formik.errors.username && formik.touched.username ? (
                  <div className={classes.formError}>
                    {formik.errors.username}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('email', true)}
                />

                {formik.errors.email && formik.touched.email ? (
                  <div className={classes.formError}>{formik.errors.email}</div>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('password', true)}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className={classes.formError}>
                    {formik.errors.password}
                  </div>
                ) : null}
              </Grid>
            </Grid>

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
                  className={classes.signupButton}
                  disabled={!formik.isValid}
                >
                  Sign Up
                </Button>
              </Grid>

              <Grid item>
                <Link
                  href="/signin"
                  variant="body2"
                  className={classes.signinLink}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default withErrorAndLoadingHandlerHOC(SignUp);
