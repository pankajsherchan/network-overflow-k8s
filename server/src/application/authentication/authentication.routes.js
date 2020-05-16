import express from 'express';
import * as authenticationController from './authentication.controller';
import {
  forgotPasswordRequest,
  validateLoginRequest,
  validateSignupRequest
} from './authentication.validation';

const router = express.Router();

router.post('/signup', validateSignupRequest, authenticationController.signup);

router.post('/login', validateLoginRequest, authenticationController.login);

// router.get('/confirmation/:tokenId', userController.verifyUser);

router.post('/forgotPassword', forgotPasswordRequest, authenticationController.forgotPassword);

router.get('/forgotPassword/:tokenId', authenticationController.verifyForgotPassword);

export default router;
