import {
  Avatar,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { environment } from '../../environments/environment';
import useHttpHook from '../../hooks/HttpHook';
import SimpleDialog from '../../shared/dialog/SimpleDialog';

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
  }
}));

const ForgotPassword = () => {
  const classes = useStyles();

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const { isLoading, error, sendRequest, clearError } = useHttpHook();

  const forgotPasswordSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async user => {
      forgotPassword(user);
    }
  });

  const forgotPassword = async user => {
    const url = `${environment.apiUrl}${environment.apis.forgotPassword}`;
    const response = await sendRequest(url, 'POST', user, {});

    if (response) {
      showDialogBox('Success', 'Please check your email to proceed further');
    }
  };

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

      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.signinContainer}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4">Forgot Password</Typography>

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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched('email', true)}
          />

          {formik.errors.email && formik.touched.email ? (
            <div className={classes.formError}>{formik.errors.email}</div>
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
    </Container>
  );
};

export default ForgotPassword;
