import DateFnsUtils from '@date-io/date-fns';
import { Container, Grid, TextField, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PlaceIcon from '@material-ui/icons/Place';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import React from 'react';
import withErrorAndLoadingHandlerHOC from '../../../hoc/ErrorAndLoadingHandlerHOC';

const useStyles = makeStyles(theme => ({
  signupContainer: {
    marginTop: theme.spacing(8),
    width: 450
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

const EventAddressForm = props => {
  const classes = useStyles();

  const formik = props.formik;

  return (
    <>
      <Container maxWidth="xs">
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.signupContainer}
        >
          <Grid container>
            <Avatar className={classes.avatar}>
              <PlaceIcon />
            </Avatar>
            <Typography variant="h4">Street Address</Typography>
          </Grid>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="address1"
                  name="address1"
                  variant="outlined"
                  required
                  fullWidth
                  id="address1"
                  label="Address 1"
                  autoFocus
                  value={formik.values.address1}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('address1', true)} // otherwise touched object in form won't populate
                />

                {formik.errors.address1 && formik.touched.address1 ? (
                  <div className={classes.formError}>
                    {formik.errors.address1}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="address2"
                  label="Address 2"
                  name="address2"
                  autoComplete="address2"
                  value={formik.values.address2}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('address2', true)}
                />

                {formik.errors.address2 && formik.touched.address2 ? (
                  <div className={classes.formError}>
                    {formik.errors.address2}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="city"
                  name="city"
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  autoFocus
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('city', true)} // otherwise touched object in form won't populate
                />

                {formik.errors.city && formik.touched.city ? (
                  <div className={classes.formError}>{formik.errors.city}</div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="state"
                  name="state"
                  variant="outlined"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  autoFocus
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('state', true)} // otherwise touched object in form won't populate
                />

                {formik.errors.state && formik.touched.state ? (
                  <div className={classes.formError}>{formik.errors.state}</div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="zipCode"
                  name="zipCode"
                  variant="outlined"
                  required
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  type="number"
                  autoFocus
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('zipCode', true)} // otherwise touched object in form won't populate
                />

                {formik.errors.zipCode && formik.touched.zipCode ? (
                  <div className={classes.formError}>
                    {formik.errors.zipCode}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="country"
                  name="country"
                  variant="outlined"
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  autoFocus
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('country', true)} // otherwise touched object in form won't populate
                />

                {formik.errors.country && formik.touched.country ? (
                  <div className={classes.formError}>
                    {formik.errors.country}
                  </div>
                ) : null}
              </Grid>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <Grid item xs={12} sm={4}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date"
                      format="MM/dd/yyyy"
                      value={formik.values.date}
                      inputVariant="outlined"
                      onChange={val => {
                        formik.setFieldValue('date', val);
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onBlur={() => formik.setFieldTouched('date', true)} // otherwise touched object in form won't populate
                    />

                    {formik.errors.date && formik.touched.date ? (
                      <div className={classes.formError}>
                        {formik.errors.date}
                      </div>
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      name="startTime"
                      label="Start Time"
                      value={formik.values.startTime}
                      inputVariant="outlined"
                      onChange={val => {
                        formik.setFieldValue('startTime', val);
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change time'
                      }}
                      onBlur={() => formik.setFieldTouched('startTime', true)} // otherwise touched object in form won't populate
                    />

                    {formik.errors.startTime && formik.touched.startTime ? (
                      <div className={classes.formError}>
                        {formik.errors.startTime}
                      </div>
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      name="endTime"
                      label="End Time"
                      value={formik.values.endTime}
                      inputVariant="outlined"
                      onChange={val => {
                        formik.setFieldValue('endTime', val);
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change time'
                      }}
                      onBlur={() => formik.setFieldTouched('endTime', true)} // otherwise touched object in form won't populate
                    />

                    {formik.errors.endTime && formik.touched.endTime ? (
                      <div className={classes.formError}>
                        {formik.errors.endTime}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default withErrorAndLoadingHandlerHOC(EventAddressForm);
