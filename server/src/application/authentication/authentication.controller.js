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
    await authService.sendUserVerificationEmail(
      req.body.username,
      req.body.email
    );
  }
  res.status(userResponse.httpStatus).send(userResponse);
});

export const login = catchAsync(async (req, res, next) => {
  res.send(await authService.loginUser(req.body));
});

/*
 * sends email with the unique token attached to the url
 */
export const forgotPassword = async (req, res, next) => {
  logger.info('AuthController - forgot password');
  const reqUser = req.body;

  try {
    const result = await authService.forgotPassword(reqUser);
    res.send(result);
  } catch (error) {
    logger.error('UserController - forgot password', {
      meta: error
    });

    res.boom.BAD_REQUEST(error);
  }
};

export const verifyForgotPassword = async (req, res, next) => {
  logger.info('AuthController - verify forgot password');

  const { tokenId } = req.params;

  if (!tokenId) {
    next(new AppError('No token found', 401));
  }

  let result = {};

  try {
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
  } catch (error) {
    logger.error(`USER CONTROLLER - Verify Forgot Password Error ${error}`);

    next(new AppError('Could not verify the user'));
  }

  res.send(result);
};

export const extractAndVerifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

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
