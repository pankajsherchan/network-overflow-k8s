import httpStatusCodes from 'http-status-codes';
import * as userService from '../../services';
import { catchAsync, checkResponseHandler, logger } from '../../utils';
import AppError from '../error/appError';

export const addUser = catchAsync(async (req, res, next) => {
  logger.info('UserController - addUser');
  const reqUser = req.body;
  const { username, email } = req.body;

  const userExists = await userService.getUser(username);

  if (checkResponseHandler(userExists)) {
    return next(new AppError('User already exits', 404));
  }

  const result = await userService.addUser(reqUser);
  await userService.sendUserVerificationEmail(username, email);
  res.send(result);
});

export const updateUser = catchAsync(async (req, res) => {
  const result = await userService.updateUser(req.body);
  res.send(result);
});

export const getUsers = catchAsync(async (req, res, next) => {
  logger.info('UserController - GetUsers');
  res.send(await userService.getUsers(req.query));
});

export const getUser = catchAsync(async (req, res, next) => {
  logger.info('UserController - GetUser');

  const { username } = req.params;
  const userResponse = await userService.getUser(username);
  console.log('userResponse: ', userResponse);

  if (!checkResponseHandler(userResponse)) {
    return next(
      new AppError(`No user with username ${username} found`, httpStatusCodes.BAD_REQUEST)
    );
  }

  res.send(userResponse);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  logger.info('UserController - DeleteUser');

  const response = await userService.deleteUser();
  res.send(response);
});
