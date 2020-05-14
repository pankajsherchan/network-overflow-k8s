import bcrypt from 'bcrypt';
import logger from '../utils';

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

const generateSalt = async () => {
  return bcrypt.genSalt(10);
};
