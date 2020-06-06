import { Container, Grid, TextField, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';
import ImageUpload from '../../../shared/components/ImageUpload';


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

const EventBasicInfoForm = props => {
  const classes = useStyles();
  const { formik } = props;
  const setBackgroundImage = file => {
    formik.setFieldValue('backgroundImage', file[0]);
  };

  const setImages = files => {
    formik.setFieldValue('images', files);
  };

  return (
    <>
      <Container maxWidth="xs">
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.signupContainer}
        >
          <Avatar className={classes.avatar}>
            <InfoIcon />
          </Avatar>
          <Typography variant="h4">Basic Info</Typography>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="title"
                  name="title"
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('title', true)} // otherwise touched object in form won't populate
                />

                {formik.errors.title && formik.touched.title ? (
                  <div className={classes.formError}>{formik.errors.title}</div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="type"
                  label="Type"
                  name="type"
                  autoComplete="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('type', true)}
                />

                {formik.errors.type && formik.touched.type ? (
                  <div className={classes.formError}>{formik.errors.type}</div>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  autoComplete="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('category', true)}
                />

                {formik.errors.category && formik.touched.category ? (
                  <div className={classes.formError}>
                    {formik.errors.category}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="hashtags"
                  label="Hashtags"
                  name="hashtags"
                  autoComplete="hashtags"
                  value={formik.values.hashtags}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('hashtags', true)}
                />

                {formik.errors.hashtags && formik.touched.hashtags ? (
                  <div className={classes.formError}>
                    {formik.errors.hashtags}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="organizer"
                  label="Organizer Name"
                  type="organizer"
                  id="organizer"
                  autoComplete="current-organizer"
                  value={formik.values.organizer}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('organizer', true)}
                />
                {formik.errors.organizer && formik.touched.organizer ? (
                  <div className={classes.formError}>
                    {formik.errors.organizer}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  autoComplete="current-description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('description', true)}
                />
                {formik.errors.description && formik.touched.description ? (
                  <div className={classes.formError}>
                    {formik.errors.description}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12}>

                <InputLabel> Background Image</InputLabel>
                <ImageUpload onImageUpload={setBackgroundImage} />

                {formik.errors.backgroundImage &&
                  formik.touched.backgroundImage ? (
                    <div className={classes.formError}>
                      {formik.errors.backgroundImage}
                    </div>
                  ) : null}
              </Grid>

              <Grid item xs={12}>
                <InputLabel> Images </InputLabel>
                <ImageUpload onImageUpload={setImages} />
                {formik.errors.images &&
                  formik.touched.images ? (
                    <div className={classes.formError}>
                      {formik.errors.images}
                    </div>
                  ) : null}
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default EventBasicInfoForm;

//event title
// type
// category
// enter hastags, tags
// organizer name
// description
// background main image
// images
