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
  BASE_URL: requireFromEnv('BASE_URL'),
  FRONTEND_BASE_URL: requireFromEnv('FRONTEND_BASE_URL')
};
