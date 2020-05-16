import express from 'express';
import * as userController from './users.controller';
import { validateGetUserRequest, validateUserUpdateRequest } from './users.validation';

const router = express.Router();

router.put('/', validateUserUpdateRequest, userController.updateUser);

router.get('/:username', validateGetUserRequest, userController.getUser);

// router.post(
//   '/changePassword',
//   validateChangePasswordRequest,
//   userController.changePassword
// );

// TODO: delete
// TODO: login

export default router;
