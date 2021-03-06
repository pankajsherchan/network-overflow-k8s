import httpStatusCodes from 'http-status-codes';
import AppError from '../application/error/appError';
import constant from '../constant';
import User from '../database/schemas/user.schema';
import { logger } from '../utils';
import { generateToken, hashPassword } from './authentication.service';
import sendEmail from './email.service';
import { addOne, deleteOne, getAll, updateOne } from './serviceHelper';

export const getUsers = async reqQuery => await getAll(User, reqQuery);

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

export const addUser = async user => {
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

  return await addOne(User, newUser);
};

export const updateUser = async (id, user) => await updateOne(User, id, user);

export const deleteUser = async id => deleteOne(User, id);

export const sendUserAddVerificationEmail = async (username, email) => {
  const userVerificationToken = generateToken(constant.VERIFY_USER_SECRET_KEY, username);

  const url = `${constant.BASE_URL}/confirmation/${userVerificationToken}`;

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
