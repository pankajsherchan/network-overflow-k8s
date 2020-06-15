import app from './app';
import connectDB from './database/db';
import env from './env';

const PORT = env.PORT || 5000;

connectDB();

const server = app.listen(PORT, () =>
  console.log(`server running in ${env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold));

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
