import express from 'express';
import * as auth from './application/authentication';
import { AppError, errorController as globalErrorHandler } from './application/error';
import { eventRoutes } from './application/events';
import { userRoutes } from './application/users';

const router = express.Router();

router.get('/', (req, res) => res.send('Hello Hello Bye whad up whad up'));

router.use('/', auth.authenticationRoutes);

router.use('/user', userRoutes);

router.use('/event', eventRoutes);

router.use('/protected', auth.extractAndVerifyToken, (req, res, next) => {});

router.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);

  next(err);
});

// error handling middleware
router.use(globalErrorHandler);

export default router;
