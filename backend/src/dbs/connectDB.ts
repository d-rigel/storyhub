import mongoose from 'mongoose';
import config from 'config';

const mongoAppUrl = config.get<string>('mongoAppUrl');

const initializeDb = async () => {
  try {
    await mongoose.connect(mongoAppUrl);
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    // setTimeout(initializeDb, 5000);
  }
};

export default initializeDb;
