import { object, string, TypeOf } from 'zod';

export const createStorySchema = object({
  body: object({
    title: string({ required_error: 'Title is required' }),
    story: string({ required_error: 'Body is required' })
      .min(8, 'Story must be more than 8 characters')
      .max(100, 'Story must be less than 100 characters'),
    status: string({ required_error: 'Status is required' })
    // user: string({ required_error: 'User is required' })
  })
});

export type CreateStoryInput = TypeOf<typeof createStorySchema>['body'];
