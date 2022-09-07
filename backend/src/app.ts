import cors from 'cors';
import morgan from 'morgan';
import { NotFoundError, ApiError, InternalError } from './core/errorHandler';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import initializeDb from './dbs/connectDB';

dotenv.config();
const { environment } = require('./config');

const app = express();
const baseUrl: string = '/api/v1';

const initializeServer = async () => {
  await initializeDb();
  //parses the request coming into json object
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(morgan('tiny'));

  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'Running' });
  });

  app.use(`${baseUrl}`, require('./routes/').default);

  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) =>
    next(new NotFoundError())
  );

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
      return ApiError.handle(err, res);
    }

    if (environment === 'development') {
      console.log(err);
      return res.status(500).send('Something went wrong');
    }

    ApiError.handle(new InternalError(), res);
  });
};

initializeServer();

export default app;
