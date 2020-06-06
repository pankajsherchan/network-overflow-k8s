import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  }
}));

const ImageUpload = props => {
  const classes = useStyles();

  const { onImageUpload } = props;

  const [files, setFiles] = useState([]);

  const [previewUrl, setPreviewUrl] = useState([]);

  useEffect(() => {
    if (!files) {
      return;
    }

    Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', ev => {
            resolve(ev.target.result);
          });

          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
        });
      })
    ).then(images => {
      setPreviewUrl(images);
    });
  }, [files]);

  const upload = event => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setFiles(files);
      onImageUpload(files);
    }
  };

  const randomId = uuidv4();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id={randomId}
        multiple
        type="file"
        onChange={upload}
      />

      <Grid container >
        {previewUrl &&
          previewUrl.map((url, index) => (
            <Grid item>
              <img
                src={previewUrl[index]}
                alt={'uploaded image'}
                key={url}
                width={200}
                height={200}
              />
            </Grid>
          ))}
      </Grid>

      <label htmlFor={randomId}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>
    </div>
  );
};

export default ImageUpload;
