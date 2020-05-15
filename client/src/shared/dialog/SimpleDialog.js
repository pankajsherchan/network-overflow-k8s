import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const SimpleDialog = props => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      color: '#fff',
      backgroundColor: '#0d47a1'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: 'white'
    }
  });

  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2)
    }
  }))(MuiDialogContent);

  const handleClose = props => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        color="secondary"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => {
            props.hide();
          }}
        >
          {props.title}
        </DialogTitle>

        <DialogContent dividers style={{ width: '350px' }}>
          <DialogContentText>{props.message}</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SimpleDialog;
