import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { environment } from '../../../environments/environment';
import useHttpHook from '../../../hooks/HttpHook';
import EventAddressForm from '../components/EventAddressForm';
import EventBasicInfoForm from '../components/EventBasicInfoForm';
import EventTicketForm from '../components/EventTicketForm';


const steps = ['Basic Info', 'Address', 'Ticket'];

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const EventAdd = () => {
  const classes = useStyles();

  const { sendMultiFormRequest } = useHttpHook();

  const eventAddSchema = Yup.object({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    type: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    category: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    hashtags: Yup.string().required('Required'),
    organizer: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    description: Yup.string().required('Required'),
    backgroundImage: Yup.mixed().required('Required'),
    images: Yup.string(),
    address1: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    address2: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    city: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    state: Yup.string().required('Required'),
    zipCode: Yup.number().required('Required'),
    country: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    startTime: Yup.string().required('Required'),
    endTime: Yup.string().required('Required')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      type: '',
      category: '',
      hashtags: '',
      organizer: '',
      description: '',
      backgroundImage: '',
      images: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      date: null,
      startTime: null,
      endTime: null
    },
    // validationSchema: eventAddSchema,
    onSubmit: async event => {
      addEvent(event);
    }
  });

  const addEvent = async (event) => {
    const formData = new FormData();
    Object.keys(event).map(key => {
      if (key !== 'images') {
        formData.append(key, event[key])
      }
    })

    if (event.images && event.images.length) {
      event.images.map(image => {
        formData.append('images', image);
      })
    }
    const url = `${environment.apiUrl}${environment.apis.event}`;
    // const res = Axios.post('https://httpbin.org/anything', formData).then(res => console.log(res));
    const response = await sendMultiFormRequest(url, formData);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <EventBasicInfoForm formik={formik} />;
      case 1:
        return <EventAddressForm formik={formik} />;
      case 2:
        return <EventTicketForm formik={formik} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Grid container direction="column">
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </>
            )}
        </>

        <Grid
          container
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
              // disabled={!formik.isValid}
              onClick={formik.submitForm}
            >
              Create Event{' '}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EventAdd;
