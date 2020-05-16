import mongoose from 'mongoose';
import env from '../env';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      useNewUrlParser: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.log(`Error : ${error.message}`.red);
    process.exit(1);
  }
};

export default connectDB;
