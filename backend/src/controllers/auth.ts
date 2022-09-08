import config from 'config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../validation-schema/user';
import AppError from '../utils/appError';

// Exclude this fields from the response
export const excludedFields = ['password'];
