import bcrypt from 'bcrypt';
import httpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import AppError from '../application/error/appError';
import User from '../database/schemas/user.schema';
import env from '../env';
import logger from '../utils';
import { sendEmail } from './email.service';

const messages = {
  USER_ALREADY_EXIST: 'User already exist',
  USER_CREATED_FAILED: 'User creation failed. Please try again',
  USER_CREATED_SUCCESS: 'User created successfully'
};

export const signup = async user => {
  logger.info('UserService - SaveUser');

  const { username, firstName, lastName, email, password } = user;

  try {
    const userInDatabase = await User.findOne({ username });
    console.log('userInDatabase: ', userInDatabase);
    if (userInDatabase) {
      return {
        data: null,
        httpStatus: httpStatusCodes.OK,
        message: messages.USER_ALREADY_EXIST
      };
    }

    console.log('here');

    const newUser = new User({
      username,
      firstName,
      lastName,
      email
    });

    const hashedPassword = await hashPassword({ password });
    newUser.password = hashedPassword;

    const savedUser = await newUser.save();

    if (!savedUser) {
      throw new AppError(messages.USER_CREATED_FAILED, httpStatusCodes.BAD_REQUEST);
    }

    logger.info('Userservice - save user - successful');

    return {
      data: savedUser,
      httpStatus: httpStatusCodes.OK
    };
  } catch (error) {
    throw new AppError(error.message, httpStatusCodes.BAD_REQUEST);
  }
};

export const loginUser = async user => {
  logger.info('UserService - Login user');

  try {
    const { email, password } = user;

    const userInDatabase = await User.findOne({ email }).select('+password');
    console.log('userInDatabase: ', userInDatabase);

    const res = await verifyPassword(password, userInDatabase.password);
    console.log('password verification: ', res);

    if (!userInDatabase || !(await verifyPassword(password, userInDatabase.password))) {
      throw new AppError('Incorrect email or password', 401);
    }

    const token = generateToken(env.LOGIN_USER_SECRET_KEY, email);

    return {
      data: token,
      httpStatus: httpStatusCodes.OK
    };
  } catch (error) {
    logger.error(`USER CONTROLLER login user: ${error}`);
    throw new AppError(error.message, httpStatusCodes.BAD_REQUEST);
  }
};

export const forgotPassword = async email => {
  logger.info('UserService - Forgot Password');

  const userForgotPasswordVerificationToken = generateToken(env.FORGOT_PASSWORD_SECRET_KEY, email);

  const url = `${env.BASE_URL}/forgotPassword/${userForgotPasswordVerificationToken}`;

  const emailConfig = {
    receiver: email,
    sender: 'pankaj2070.sherchan@gmail.com',
    templateName: 'call_to_action',
    name: 'Hello there!!',
    verify_account_url: url,
    header: 'Forgot Password',
    buttonText: 'Reset Password',
    text: 'You are almost there. To reset your password please click the link below.'
  };

  return sendEmail(emailConfig);
};

const verifyPassword = async (password, encryptPassword) => bcrypt.compare(password, encryptPassword);

export const sendUserVerificationEmail = async (username, email) => {
  const userVerificationToken = generateToken(env.VERIFY_USER_SECRET_KEY, username);

  const url = `${env.BASE_URL}/confirmation/${userVerificationToken}`;

  const emailConfig = {
    receiver: email,
    sender: 'pankaj2070.sherchan@gmail.com',
    templateName: 'call_to_action',
    name: 'Pankaj Sherchan',
    verify_account_url: url,
    header: 'Account Created',
    buttonText: 'Activate Account',
    text: 'You are almost there. To finish activating your account please click the link below.'
  };

  return sendEmail(emailConfig);
};

export const generateToken = (secretKey, tokenData) =>
  jwt.sign({ tokenData }, secretKey, {
    expiresIn: env.TOKEN_EXPIRATION_TIME
  });

export const verifyToken = (token, secretKey) => jwt.verify(token, secretKey);

export const extractTokenInfo = (token, secretKey) => {
  jwt.verify(token, secretKey, (error, authData) => {
    if (error) {
      throw new AppError('Invalid Token', 401);
    } else {
      return {
        data: authData,
        status: httpStatusCodes.OK
      };
    }
  });
};

export const hashPassword = async ({ password }) => {
  logger.info('Security Service - hashPassword');
  try {
    const salt = await generateSalt();

    return bcrypt.hash(password, salt);
  } catch (error) {
    logger.error('Security Service - hashPassword', error);

    return error;
  }
};

const generateSalt = async () => bcrypt.genSalt(10);
