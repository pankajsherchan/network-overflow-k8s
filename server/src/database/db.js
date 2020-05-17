import mongoose from 'mongoose';
import env from '../env';

const connectDB = async () => {
  try {
    const mongoURL = env.MONGO_URI_ATLAS.replace('<username>', env.MONGO_USERNAME)
      .replace('<password>', env.MONGO_PASSWORD)
      .replace('<database>', env.MONGO_DATABASE);
    const conn = await mongoose.connect(mongoURL, {
      useNewUrlParser: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.log(`Error : ${error.message}`.red);
    process.exit(1);
  }
};

export default connectDB;
