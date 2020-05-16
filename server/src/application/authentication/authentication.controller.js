import httpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import env from '../../env';
import * as authService from '../../services/authentication.service';
import logger from '../../utils';
import catchAsync from '../../utils/catchAsync';
import checkResponse from '../../utils/responseHandler';
import AppError from '../error/appError';

export const signup = catchAsync(async (req, res, next) => {
  const userResponse = await authService.signup(req.body);

  if (checkResponse(userResponse)) {
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

export const verifyForgotPassword = catchAsync(async (req, res, next) => {
  logger.info('AuthController - verify forgot password');

  const { tokenId } = req.params;

  if (!tokenId) {
    next(new AppError('No token found', 401));
  }

  const verifyForgotPasswordToken = authService.verifyToken(
    tokenId,
    env.FORGOT_PASSWORD_SECRET_KEY
  );

  if (verifyForgotPasswordToken) {
    return {
      data: true,
      httpStatus: httpStatusCodes.OK
    };
  }

  return {
    data: false,
    httpStatus: httpStatusCodes.BAD_REQUEST
  };
});

export const extractAndVerifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    verifyToken(req, res, next);
  } else {
    return next(new AppError('You are not logged in.', 401));
  }
};

export const verifyToken = (req, res, next) => {
  jwt.verify(req.token, env.LOGIN_USER_SECRET_KEY, (error, authData) => {
    if (error) {
      next(new AppError('Invalid Token', 401));
    } else {
      res.status(200).send({
        data: authData
      });
    }
  });
};
