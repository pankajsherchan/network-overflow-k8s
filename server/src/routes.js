import express from 'express';
import { extractAndVerifyToken } from './application/authentication/authentication.controller';
import authenticationRoutes from './application/authentication/authentication.routes';
import AppError from './application/error/appError';
import globalErrorHandler from './application/error/error.controller';
import userRoutes from './application/users/users.routes';

const router = express.Router();

router.get('/', (req, res) => res.send('Hello Hello Bye whad up whad up'));

router.use('/', authenticationRoutes);

router.use('/api/user', userRoutes);

router.use('/protected', extractAndVerifyToken, (req, res, next) => {});

router.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);

  next(err);
});

// error handling middleware
router.use(globalErrorHandler);

export default router;
