import express from 'express';
import * as userController from './users.controller';
import {
  validateChangePasswordRequest,
  validateGetUserRequest,
  validateSignupRequest,
  validateUserUpdateRequest
} from './users.validation';

const router = express.Router();

router.post('/', validateSignupRequest, userController.createUser);

router.put('/', validateUserUpdateRequest, userController.updateUser);

router.get('/:username', validateGetUserRequest, userController.getUser);

router.post('/forgotPassword', userController.forgotPassword);

router.post(
  '/changePassword',
  validateChangePasswordRequest,
  userController.changePassword
);

// TODO: delete
// TODO: login

export const userRoutes = router;
