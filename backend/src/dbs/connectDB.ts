import mongoose from 'mongoose';
import config from 'config';
// import dotenv from 'dotenv';

// dotenv.config();

// const { mongoAppUrl } = require('../config');
// const mongoAppUrl = `mongodb://${config.get('dbPort')}/${config.get('dbName')}`;
const mongoAppUrl = config.get<string>('mongoAppUrl');

// const initializeDb = async (): Promise<any> => {
//   mongoose.connect(mongoAppUrl, (err: any) => {
//     if (err) return console.log(err);

//     setTimeout(initializeDb, 5000);
//     console.log('connected to database');
//   });
// };

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
