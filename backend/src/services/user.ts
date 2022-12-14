import { omit, get } from 'lodash';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import config from 'config';
import userModel, { User } from '../models/user';
import { excludedFields } from '../controllers/auth';
import { signJwt } from '../middleware/jwt';
import redisClient from '../dbs/connectRedis';
import { DocumentType } from '@typegoose/typegoose';

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

// Find All users
export const findAllUsers = async () => {
  return await userModel.find();
};

// Find one user by any fields
export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select('+password');
};

// google oauth, update user info in db
export const findAndUpdateUser = async (
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options: QueryOptions
) => {
  return await userModel.findOneAndUpdate(query, update, options);
};

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
  // Sign the access token
  const access_token = signJwt({ sub: user._id }, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`
    // expiresIn: '15m'
  });

  // Sign the refresh token
  const refresh_token = signJwt({ sub: user._id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`
    // expiresIn: '15m'
  });

  // Create a Session
  redisClient.set(user._id, JSON.stringify(user), {
    EX: 60 * 60
    // NX: true
  });

  // Return access token
  return { access_token, refresh_token };
};
