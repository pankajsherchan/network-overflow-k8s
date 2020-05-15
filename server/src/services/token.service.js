import jwt from 'jsonwebtoken';
import env from '../env';

export const generateToken = (secretKey, tokenData) => {
  return jwt.sign({ tokenData }, secretKey, {
    expiresIn: env.TOKEN_EXPIRATION_TIME
  });
};

export const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};
