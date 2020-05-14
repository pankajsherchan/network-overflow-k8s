import app from './app';
import connectDB from './database/db';
import env from './env';

const PORT = env.PORT;

connectDB();

app.listen(PORT, () =>
  console.log(
    `server running in ${env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
  )
);
