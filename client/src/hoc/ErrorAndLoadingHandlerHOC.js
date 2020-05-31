import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
import useHttpErrorsHook from '../hooks/HttpErrorsHook';
import SimpleDialog from '../shared/dialog/SimpleDialog';

const useStyles = makeStyles(theme => ({
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const withErrorAndLoadingHandlerHOC = WrappedComponent => {
  return props => {
    const classes = useStyles();

    const { error, clearError, isLoading } = useHttpErrorsHook();

    return (
      <>
        {error ? (
          <SimpleDialog
            message={error}
            title={'Error'}
            hide={clearError}
          ></SimpleDialog>
        ) : null}

        <div className={classes.spinnerContainer}>
          {isLoading ? <CircularProgress /> : null}
        </div>

        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorAndLoadingHandlerHOC;
