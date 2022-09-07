import { config } from 'dotenv';

config();

const {
  NODE_PORT,
  NODE_ENV,
  MONGO_LOCAL_PORT,
  MONGO_LOCAL_NAME,
  MONGO_USERNAME,
  MONGO_PASSWORD
} = process.env;

const environment = NODE_ENV;
const port = NODE_PORT || 4500;
const mongoAppUrl = `mongodb://${MONGO_LOCAL_PORT}/${MONGO_LOCAL_NAME}`;
// const mongoAppUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@host:${MONGO_LOCAL_PORT}/${MONGO_LOCAL_NAME}?authSource=admin`;

export { environment, port, mongoAppUrl };
