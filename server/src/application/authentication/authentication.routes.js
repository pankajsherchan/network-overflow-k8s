import express from 'express';
import * as authenticationController from './authentication.controller';
import {
  forgotPasswordRequest,
  validateChangePasswordRequest,
  validateLoginRequest,
  validateSignupRequest
} from './authentication.validation';

const router = express.Router();

router.post('/signup', validateSignupRequest, authenticationController.signup);

router.post('/login', validateLoginRequest, authenticationController.login);

router.get('/userVerification/:tokenId', authenticationController.verifyUser);

router.post('/forgotPassword', forgotPasswordRequest, authenticationController.forgotPassword);

router.get('/forgotPassword/:tokenId', authenticationController.verifyForgotPassword);

router.post(
  '/changePassword',
  validateChangePasswordRequest,
  authenticationController.changePassword
);

export default router;
