import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import boom from 'express-boom';
import morgan from 'morgan';
import { routes } from './routes';

const app = express();

setup();

app.use('/', routes);

function setup() {
  app.use(cors());

  app.use(morgan('dev'));

  app.use(boom());

  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
  });
}

export default app;
