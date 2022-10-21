import { omit } from 'lodash';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import storyModel, { Story } from '../models/story';

// CreateStory service

export const createStory = async (input: Partial<Story>) => {
  const story = await storyModel.create(input);
  return omit(story.toJSON());
};

// Find All stories ---public
export const findAllStory = async () => {
  return await storyModel
    .find({ status: 'public' })
    .populate('user')
    .sort({ createdAt: 'desc' })
    .lean();
};

// Find User by Id
export const findStoryById = async (id: string) => {
  const story = await storyModel.findById(id).lean();
  return omit(story);
};

export const findAndUpdateStory = async (
  query: FilterQuery<Story>,
  update: UpdateQuery<Story>,
  options: QueryOptions
) => {
  return await storyModel.findOneAndUpdate(query, update, options);
};
