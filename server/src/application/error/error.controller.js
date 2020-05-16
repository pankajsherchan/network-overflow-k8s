import logger from '../../utils';
import AppError from './appError';

const sendErrorDev = (err, res) => {
  logger.info('Error Controller - send error dev');
  console.log('err: ', err);

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // operational are the trusted error - send to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // console log the error
    // programming or other unknown errors
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

const handleJWTError = () => new AppError('Invalid token. Please login', 401);

const errorController = (err, req, res, next) => {
  const error = {};
  error.statusCode = err.statusCode || 500;
  error.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let errorProd = { ...err };
    if (errorProd.name === 'JsonWebTokenError') {
      errorProd = handleJWTError();
    }

    sendErrorProd();
  }
};

export default errorController;
