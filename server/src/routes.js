import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticationRoutes } from './application/authentication';
import { userRoutes } from './application/users';
import { extractToken } from './services/token.service';
import AppError from './utils/appError';
import globalErrorHandler from './utils/errorHandler';

const router = express.Router();

router.get('/', (req, res) => {
  return res.send('Hello Hello Bye whad up whad up');
});

router.use('/', authenticationRoutes);

router.use('/api/user', userRoutes);

router.use('/protected', extractToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Authorized',
        authData
      });
    }
  });
});

router.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);

  next(err);
});

// error handling middleware
router.use(globalErrorHandler);

export const routes = router;
