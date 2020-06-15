import httpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import constant from '../../constant';
import * as authService from '../../services';
import { catchAsync, checkResponseHandler, logger } from '../../utils';
import AppError from '../error/appError';

export const signup = catchAsync(async (req, res, next) => {
  const userResponse = await authService.signup(req.body);

  if (checkResponseHandler(userResponse)) {
    await authService.sendUserVerificationEmail(req.body.username, req.body.email);
  }
  res.status(userResponse.httpStatus).send(userResponse);
});

export const login = catchAsync(async (req, res, next) => {
  res.send(await authService.loginUser(req.body));
});

/*
 * sends email with the unique token attached to the url
 */
export const forgotPassword = catchAsync(async (req, res, next) => {
  logger.info('AuthController - forgot password');
  const { email } = req.body;

  const result = await authService.forgotPassword(email);
  res.send(result);
});

export const changePassword = catchAsync(async (req, res, next) => {
  logger.info('AuthController - changePassword');
  const { email, password } = req.body;

  const result = await authService.changePassword(email, password);
  res.send(result);
});

export const verifyUser = catchAsync(async (req, res, next) => {
  logger.info('AuthController - verify user');

  const { tokenId } = req.params;

  if (!tokenId) {
    next(new AppError('No token found', 401));
  }

  const userTokenData = authService.verifyToken(tokenId, constant.VERIFY_USER_SECRET_KEY);

  console.log('userTokenData: ', userTokenData);

  if (userTokenData) {
    // update database
    await authService.updateUserVerified(userTokenData.tokenData);

    res.send({
      data: userTokenData,
      httpStatus: httpStatusCodes.OK
    });
  }

  res.send({
    data: null,
    httpStatus: httpStatusCodes.UNAUTHORIZED
  });
});

export const verifyForgotPassword = catchAsync(async (req, res, next) => {
  logger.info('AuthController - verify forgot password');

  const { tokenId } = req.params;

  if (!tokenId) {
    next(new AppError('No token found', 401));
  }

  const forgotPasswordTokenData = authService.verifyToken(tokenId, constant.FORGOT_PASSWORD_SECRET_KEY);

  console.log('verifyForgotPasswordToken: ', forgotPasswordTokenData);

  if (forgotPasswordTokenData) {
    res.send({
      data: forgotPasswordTokenData,
      httpStatus: httpStatusCodes.OK
    });
  }

  res.send({
    data: null,
    httpStatus: httpStatusCodes.UNAUTHORIZED
  });
});

export const extractAndVerifyToken = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in.', 401));
  }

  if (verifyToken(token, constant.LOGIN_USER_SECRET_KEY)) {
    // get the user information
    // check if the user is verified

    next();
  }

  next();
};

export const verifyToken = (token, secretKey) => {
  jwt.verify(token, secretKey, (error, authData) => {
    if (error) {
      return false;
    }
    return true;
  });
};
