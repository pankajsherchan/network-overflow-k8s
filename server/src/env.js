import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config();

function requireFromEnv(key) {
  if (typeof process.env[key] === 'undefined') {
    console.error(`${colors.red('[ERROR] Missing env variable:')} ${key}`);

    return process.exit(1);
  }

  return process.env[key];
}

export default {
  NODE_ENV: requireFromEnv('NODE_ENV'),
  MONGO_URI: requireFromEnv('MONGO_URI'),
  MONGO_URI_ATLAS: requireFromEnv('MONGO_URI_ATLAS'),
  MONGO_USERNAME: requireFromEnv('MONGO_USERNAME'),
  MONGO_PASSWORD: requireFromEnv('MONGO_PASSWORD'),
  MONGO_DATABASE: requireFromEnv('MONGO_DATABASE'),
  PORT: requireFromEnv('PORT'),
  LOGIN_USER_SECRET_KEY: requireFromEnv('LOGIN_USER_SECRET_KEY'),
  SEND_GRID_API_KEY: requireFromEnv('SEND_GRID_API_KEY'),
  TOKEN_EXPIRATION_TIME: requireFromEnv('TOKEN_EXPIRATION_TIME'),
  VERIFY_USER_SECRET_KEY: requireFromEnv('VERIFY_USER_SECRET_KEY'),
  FORGOT_PASSWORD_SECRET_KEY: requireFromEnv('FORGOT_PASSWORD_SECRET_KEY'),
  BASE_URL: requireFromEnv('BASE_URL'),
  FRONTEND_BASE_URL: requireFromEnv('FRONTEND_BASE_URL')
};
