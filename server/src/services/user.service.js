import httpStatusCodes from 'http-status-codes';
import AppError from '../application/error/appError';
import User from '../database/schemas/user.schema';
import env from '../env';
import logger from '../utils';
import { generateToken, hashPassword } from './authentication.service';
import sendEmail from './email.service';

const messages = {
  USER_ALREADY_EXIST: 'User already exist',
  USER_CREATED_FAILED: 'User creation failed. Please try again',
  USER_CREATED_SUCCESS: 'User created successfully',
  USER_UPDATE_FAILED: 'User update failed. Please try again',
  USER_DELETE_FAILED: 'User delete failed. Please try again'
};

export const getUsers = async () => {
  logger.info('User Service - GetUsers');

  try {
    return {
      data: await User.find(),
      httpStatus: httpStatusCodes.OK
    };
  } catch (error) {
    throw new AppError('Could not get users', httpStatusCodes.BAD_REQUEST);
  }
};

export const getUser = async username => {
  logger.info('User Service - GetUser', { meta: username });

  try {
    const user = await User.findOne({ username });
    return {
      data: user,
      httpStatus: httpStatusCodes.OK
    };
  } catch (error) {
    logger.error('UserService - getUser', { meta: error });

    throw new AppError(`Could not get user with username ${username}`, httpStatusCodes.BAD_REQUEST);
  }
};

export const createUser = async user => {
  logger.info('UserService - Create User');

  const { username, firstName, lastName, email, password } = user;

  const newUser = new User({
    username,
    firstName,
    lastName,
    email
  });

  const hashedPassword = await hashPassword({ password });
  newUser.password = hashedPassword;

  try {
    logger.info('User service - create user - successful');

    return {
      data: await newUser.save(),
      httpStatus: httpStatusCodes.OK
    };
  } catch (error) {
    throw new AppError(messages.USER_CREATED_FAILED, httpStatusCodes.BAD_REQUEST);
  }
};

export const updateUser = async user => {
  logger.info('User Service - update user');
  try {
    const updatedUser = await User.updateOne({ _id: user._id }, user);

    return {
      data: updatedUser,
      httpStatus: httpStatusCodes.OK
    };
  } catch (err) {
    throw new AppError(messages.USER_UPDATE_FAILED, httpStatusCodes.BAD_REQUEST);
  }
};

export const deleteUser = async id => {
  logger.info('User Service - delete user');
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    return {
      data: deletedUser,
      httpStatus: httpStatusCodes.OK
    };
  } catch (err) {
    throw new AppError(messages.USER_DELETE_FAILED, httpStatusCodes.BAD_REQUEST);
  }
};

export const sendUserVerificationEmail = async (username, email) => {
  const userVerificationToken = generateToken(env.VERIFY_USER_SECRET_KEY, username);

  const url = `${env.BASE_URL}/confirmation/${userVerificationToken}`;

  const emailConfig = {
    receiver: email,
    sender: 'pankaj2070.sherchan@gmail.com',
    templateName: 'call_to_action',
    name: 'Pankaj Sherchan',
    verifyAccountUrl: url,
    header: 'Account Created',
    buttonText: 'Activate Account',
    text: 'You are almost there. To finish activating your account please click the link below.'
  };

  return sendEmail(emailConfig);
};
