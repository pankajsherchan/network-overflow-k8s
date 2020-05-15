import express from 'express';
import { validateSignupRequest } from '../users/users.validation';
import * as authenticationController from './auth.controller';

const router = express.Router();

router.post('/signup', validateSignupRequest, authenticationController.signup);

// router.post('/login', validateLoginRequest, userController.login);

// router.get('/confirmation/:tokenId', userController.verifyUser);

// router.get('/forgotPassword/:tokenId', userController.verifyForgotPassword);

export const authenticationRoutes = router;
