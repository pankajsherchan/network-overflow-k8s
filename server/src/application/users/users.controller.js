import httpStatusCode from 'http-status-codes';
import env from '../../env';
import {
  hashPassword,
  verifyToken
} from '../../services/authentication.service';
import * as userService from '../../services/user.service';
import { HTTP_RESPONSE_MESSAGES } from '../../shared/messages';
import logger from '../../utils';
import catchAsync from '../../utils/catchAsync';
import AppError from '../error/appError';

export const createUser = catchAsync(async (req, res) => {
  logger.info('UserController - CreateUser');
  const reqUser = req.body;
  const { username, email } = req.body;

  const result = await userService.saveUser(reqUser);
  await userService.sendUserVerificationEmail(username, email);
  res.send(result);
});

export const updateUser = catchAsync(async (req, res) => {
  const result = await userService.updateUser(req.body);
  res.send(result);
});

export const login = catchAsync(async (req, res) => {
  logger.info('UserController - login');
  const token = await userService.loginUser(req.body);
  res.json(token);
});

/**
 *returns the user by username
 *@reqParam username
 * @param {*} req
 * @param {*} res
 */
export const getUser = catchAsync(async (req, res, next) => {
  logger.info('UserController - GetUser');

  const username = req.params.username;
  const result = await userService.getUser({ username });

  if (!result || !result.data) {
    return next(new AppError(`No user with username ${username} found`, 404));
  }

  res.send(result);
});

/**
 * verifies user and updates the user's verified field to true
 * @reqParam tokenId
 * @param {*} req
 * @param {*} res
 */
export const verifyUser = async (req, res) => {
  logger.info('USER Controller - Verify User');

  if (!req.params.tokenId) {
    res.send(
      HTTP_RESPONSE_MESSAGES.VERIFICATION.USER_VERIFICATION_DATA_NOT_FOUND
    );
  }

  let result = {};

  const { tokenId } = req.params;

  try {
    const data = await verifyToken(tokenId, env.VERIFY_USER_SECRET_KEY);
    const { tokenData: username } = data;

    const userInDatabase = await userService.getUser({ username });

    const user = userInDatabase.data;
    user.verified = true;

    await userService.updateUser(user);

    result = {
      username,
      httpStatus: httpStatusCode.OK,
      message: HTTP_RESPONSE_MESSAGES.VERIFICATION.USER_VERIFIED_SUCCESSFUL
    };
  } catch (error) {
    logger.error(`USER CONTROLLER - Verify User Error ${error}`);

    result = {
      data: null,
      httpStatus: httpStatusCode.BAD_REQUEST,
      message: HTTP_RESPONSE_MESSAGES.VERIFICATION.USER_VERIFIED_FAILED
    };
  }

  res.send(result);
};

export const changePassword = async (req, res) => {
  const { username, password } = req.body;

  let result = {};

  try {
    const userInDatabase = await userService.getUser({ username });
    console.log('userInDatabase: ', userInDatabase);

    console.log(!userInDatabase.data);

    if (!userInDatabase.data) {
      result = {
        data: null,
        httpStatus: httpStatusCode.NOT_FOUND,
        message: 'User not found'
      };

      return res.send(result);
    }

    const user = userInDatabase.data;

    const hashedPassword = await hashPassword({ password });
    user.password = hashedPassword;

    await userService.updateUser(user);

    result = {
      user,
      httpStatus: httpStatusCode.OK,
      message:
        HTTP_RESPONSE_MESSAGES.VERIFICATION.USER_PASSWORD_CHANGE_SUCCESSFUL
    };
  } catch (error) {
    logger.error(`USER CONTROLLER - Verify User Error ${error}`);

    result = {
      data: null,
      httpStatus: httpStatusCode.BAD_REQUEST,
      message: HTTP_RESPONSE_MESSAGES.VERIFICATION.USER_PASSWORD_CHANGE_FAILED
    };
  }

  return res.send(result);
};
