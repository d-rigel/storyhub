import cors from 'cors';
import morgan from 'morgan';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
import config from 'config';
import initializeDb from './dbs/connectDB';
import userRouter from './routes/user/user';
import authRouter from './routes/auth/auth';
import sessionRouter from './routes/session/session';
import storyRouter from './routes/story/story';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { apiDocumentation } from '../src/docs/apidoc';

require('dotenv').config();
const environment = config.get<string>('environment');
const swaggerOptions = config.get<any>('swaggerOptions');

const app = express();
// const baseUrl: string = '/api/v1';
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const initializeServer = async () => {
  await initializeDb();

  // 1. Body Parser
  app.use(express.json({ limit: '10kb' }));

  //Cookie Parser
  app.use(cookieParser());

  // Logger
  if (environment === 'development') app.use(morgan('dev'));

  app.use(
    cors({
      // origin: config.get<string>('origin'),
      origin: ['http://localhost:3000'],
      credentials: true
    })
  );

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDocumentation));

  // app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/sessions', sessionRouter);
  app.use('/api/stories', storyRouter);
  app.use('/status', (req: Request, res: Response) => {
    return res.status(200).send('Server up and running');
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
