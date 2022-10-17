import { omit } from 'lodash';
import storyModel, { Story } from '../models/story';

// CreateStory service

export const createStory = async (input: Partial<Story>) => {
  const user = await storyModel.create(input);
  return omit(user.toJSON());
};
