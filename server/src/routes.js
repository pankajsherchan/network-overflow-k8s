import express from 'express';
import jwt from 'jsonwebtoken';
import { userRoutes } from './application/users';
import { authenticationRoutes } from './authentication.routes';
import { extractToken } from './services/token.service';

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

export const routes = router;
