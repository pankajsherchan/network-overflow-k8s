import { logger } from './logger';

const catchAsync = fn => {
  return (req, res, next) => {
    // catching the rejected promise from async try catch
    fn(req, res, next).catch(err => {
      logger.info(`Error in Catch Async ${err}`);

      return next(err);
    });
  };
};

export default catchAsync;
