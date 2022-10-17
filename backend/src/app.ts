require('dotenv').config();
import cors from 'cors';
import morgan from 'morgan';
import { NotFoundError, ApiError, InternalError } from './core/errorHandler';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import config from 'config';
import initializeDb from './dbs/connectDB';
import userRouter from './routes/user/user';
import authRouter from './routes/auth/auth';
import sessionRouter from './routes/session/session';
import storyRouter from './routes/story/story';

// dotenv.config();
const { environment } = require('./config');

const app = express();
// const baseUrl: string = '/api/v1';

const initializeServer = async () => {
  await initializeDb();

  // 1. Body Parser
  app.use(express.json({ limit: '10kb' }));

  //Cookie Parser
  app.use(cookieParser());
  //parses the request coming into json object
  // app.use(express.urlencoded({ extended: true }));
  // app.use(express.json());

  // app.use(morgan('tiny'));

  // Logger
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  app.use(
    cors({
      origin: config.get<string>('origin'),
      credentials: true
    })
  );

  // ...................

  //set global variable
  // app.use(function (req: Request, res: Response, next: NextFunction) {
  //   res.locals.user = req.user || null;
  //   console.log('checking>>', req);
  //   next();
  // });

  // ..........................................

  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/sessions', sessionRouter);
  app.use('/api/stories', storyRouter);

  // Testing
  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'Running' });
  });

  // UnKnown Routes
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
  });

  // Global Error Handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  });
};

initializeServer();

export default app;
