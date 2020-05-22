import winston from 'winston';
import mongoTransport from 'winston-mongodb'; // needed for transports.MongoDB
import env from '../env';

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),
  defaultMeta: {},
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    new winston.transports.MongoDB({ db: env.MONGO_URI, level: 'error' }) // will store the logs in log table by default
  ]
});

if (env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

logger.info('Log connection to MongoDB', mongoTransport);

export default logger;
