import { omit } from 'lodash';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import storyModel, { Story } from '../models/story';

// CreateStory service

export const createStory = async (input: Partial<Story>) => {
  const user = await storyModel.create(input);
  return omit(user.toJSON());
};

// Find All stories ---public
export const findAllStory = async () => {
  return await storyModel
    .find({ status: 'public' })
    .populate('user')
    .sort({ createdAt: 'desc' })
    .lean();
};
