import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import boom from 'express-boom';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import xss from 'xss-clean';
import env from './env';
import routes from './routes';

const app = express();

setup();

app.use('/', routes);

function setup() {
  // set security http headers
  app.use(helmet());

  app.use(cors());

  if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // limits the requests
  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP. Please try again in an hour'
  });

  app.use(limiter);

  app.use(boom());

  app.use(
    bodyParser.json({
      limit: '10kb'
    })
  );

  // data sanitization against NOSQL query injection
  app.use(mongoSanitize());

  // data sanitization against XSS
  app.use(xss());

  // app.use(hpp());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
  });
}

export default app;
