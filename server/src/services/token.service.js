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

/* 
 FORMAT OF TOKEN
 Bearer <Token> 
*/
export const extractToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
};
