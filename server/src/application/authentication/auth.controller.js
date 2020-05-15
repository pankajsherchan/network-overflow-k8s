import jwt from 'jsonwebtoken';
import env from '../../env';
import * as userService from '../../services/user.service';
import catchAsync from '../../utils/catchAsync';
import AppError from '../error/appError';

export const signup = catchAsync(async (req, res, next) => {
  const userResponse = await userService.saveUser(req.body);
  await userService.sendUserVerificationEmail(
    req.body.username,
    req.body.email
  );
  res.send(userResponse);
});

export const login = catchAsync(async (req, res, next) => {
  res.send(await userService.loginUser(req.body));
});

export const protect = catchAsync(async (req, res, next) => {
  next();
});

/* 
 FORMAT OF TOKEN
 Bearer <Token> 
*/
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
