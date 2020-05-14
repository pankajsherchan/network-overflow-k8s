import express from 'express';
import * as userController from './application/users/users.controller';
import {
  validateLoginRequest,
  validateSignupRequest
} from './application/users/users.validation';

const router = express.Router();

router.post('/signup', validateSignupRequest, userController.createUser);

router.post('/login', validateLoginRequest, userController.login);

router.get('/confirmation/:tokenId', userController.verifyUser);

router.get('/forgotPassword/:tokenId', userController.verifyForgotPassword);

export const authenticationRoutes = router;
