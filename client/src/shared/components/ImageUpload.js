import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React, { useEffect, useState } from 'react';

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

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const upload = event => {
    let pickedFile;

    if (event.target.files && event.target.files.length > 0) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      onImageUpload(pickedFile);
    }
  };

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={upload}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>

      {previewUrl && (
        <img src={previewUrl} alt={'uploaded image'} width={200} height={200} />
      )}

      {!previewUrl && <div> please pick an image </div>}
    </div>
  );
};

export default ImageUpload;
