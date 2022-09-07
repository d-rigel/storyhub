import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { mongoAppUrl } = require('../config');

const initializeDb = async (): Promise<any> => {
  mongoose.connect(mongoAppUrl, (err: any) => {
    if (err) return console.log(err);

    // setTimeout(initializeDb, 5000);
    console.log('connected to database');
  });
};

export default initializeDb;
