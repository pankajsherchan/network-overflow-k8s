import express from 'express';
import * as userController from './users.controller';
import {
  validateAddUserRequest,
  validateDeleteUserRequest,
  validateGetUserRequest,
  validateUpdateUserRequest
} from './users.validation';

const router = express.Router();

router.get('/', validateGetUserRequest, userController.getUser);
router.post('/', validateAddUserRequest, userController.addUser);
router.put('/', validateUpdateUserRequest, userController.updateUser);
router.delete('/', validateDeleteUserRequest, userController.deleteUser);
router.get('/:username', validateGetUserRequest, userController.getUser);

export default router;
