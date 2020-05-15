import bcrypt from 'bcrypt';
import httpStatus from 'http-status-codes';
import User from '../database/schemas/user.schema';
import env from '../env';
import { HTTP_RESPONSE_MESSAGES } from '../shared/messages';
import logger from '../utils';
import AppError from '../utils/appError';
import checkResponse from '../utils/responseHandler';
import { sendEmail } from './email.service';
import { hashPassword } from './security.service';
import { generateToken } from './token.service';

const messages = {
  USER_ALREADY_EXIST: 'User already exist',
  USER_CREATED_FAILED: 'User creation failed. Please try again',
  USER_CREATED_SUCCESS: 'User created successfully'
};

export const getUser = async ({ username }) => {
  logger.info('User Service - GetUser', { meta: username });

  let result = {};

  try {
    const user = await User.findOne({ username });
    result = {
      data: user,
      httpStatus: httpStatus.OK,
      message: HTTP_RESPONSE_MESSAGES.USER.USER_GET_SUCCESSFUL
    };
  } catch (error) {
    logger.error('UserService - getUser', { meta: error });

    result = {
      data: null,
      httpStatus: httpStatus.BAD_REQUEST,
      message: HTTP_RESPONSE_MESSAGES.USER.USER_GET_FAILED
    };

    throw error;
  }

  return result;
};

export const saveUser = async user => {
  logger.info('UserService - SaveUser');

  const { username, firstName, lastName, email, password } = user;

  try {
    const userInDatabase = await getUser({ username });
    if (checkResponse(userInDatabase)) {
      throw new AppError(messages.USER_ALREADY_EXIST, httpStatus.BAD_REQUEST);
    }

    const newUser = new User({
      username,
      firstName,
      lastName,
      email
    });

    const hashedPassword = await hashPassword({ password });
    newUser.password = hashedPassword;

    user = await newUser.save();

    if (!user) {
      throw new AppError(messages.USER_CREATED_FAILED, httpStatus.BAD_REQUEST);
    }

    logger.info('Userservice - save user - successful');

    return {
      data: user,
      httpStatus: httpStatus.OK
    };
  } catch (error) {
    throw new AppError(error.message, httpStatus.BAD_REQUEST);
  }
};

export const loginUser = async user => {
  logger.info('UserService - Login user');

  let result = {};

  try {
    const { username, password } = user;
    const userInDatabase = await getUser({ username });

    if (userInDatabase) {
      const passwordMatch = await bcrypt.compare(
        password,
        userInDatabase.data.password
      );

      if (passwordMatch) {
        const token = generateToken(env.LOGIN_USER_SECRET_KEY, username);

        result = {
          data: token,
          httpStatus: httpStatus.OK,
          message: HTTP_RESPONSE_MESSAGES.USER.USER_LOGGED_SUCCESSFUL
        };
      } else {
        result = {
          data: null,
          httpStatus: httpStatus.BAD_REQUEST,
          message: HTTP_RESPONSE_MESSAGES.USER.USER_USERNAME_PASSWORD_ERROR
        };
      }
    }
  } catch (error) {
    logger.error(`USER CONTROLLER login user: ${error}`);

    result = {
      data: null,
      httpStatus: httpStatus.BAD_REQUEST,
      message: error.message
    };
  }

  return result;
};

export const updateUser = async user => {
  logger.info('User Service - update user');

  let result;

  try {
    const updatedUser = await User.updateOne({ _id: user._id }, user);

    result = {
      data: updatedUser,
      httpStatus: httpStatus.OK,
      message: HTTP_RESPONSE_MESSAGES.USER.USER_UPDATED_SUCCESSFUL
    };
  } catch (err) {
    result = {
      data: null,
      httpStatus: httpStatus.BAD_REQUEST,
      message: err
    };
  }

  return result;
};

export const forgotPassword = async user => {
  const { username, email } = user;

  const userForgotPasswordVerificationToken = generateToken(
    env.FORGOT_PASSWORD_SECRET_KEY,
    username
  );

  const url = `http://localhost:5000/forgotPassword/${userForgotPasswordVerificationToken}`;

  const emailConfig = {
    receiver: 'w0573147@selu.edu', // should be email
    sender: 'pankaj2070.sherchan@gmail.com',
    templateName: 'call_to_action',
    name: 'Pankaj Sherchan',
    verify_account_url: url,
    header: 'Forgot Password',
    buttonText: 'Reset Password',
    text:
      'You are almost there. To reset your password please click the link below.'
  };

  return sendEmail(emailConfig);
};

export const sendUserVerificationEmail = async (username, email) => {
  const userVerificationToken = generateToken(
    env.VERIFY_USER_SECRET_KEY,
    username
  );

  const url = `http://localhost:5000/confirmation/${userVerificationToken}`;

  const emailConfig = {
    receiver: email,
    sender: 'pankaj2070.sherchan@gmail.com',
    templateName: 'call_to_action',
    name: 'Pankaj Sherchan',
    verify_account_url: url,
    header: 'Account Created',
    buttonText: 'Activate Account',
    text:
      'You are almost there. To finish activating your account please click the link below.'
  };

  return sendEmail(emailConfig);
};
