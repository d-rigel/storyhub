import { createStory } from '../services/story';
import { NextFunction, Request, Response } from 'express';
import { CreateStoryInput } from '../validation-schema/story';

export const createStoryHandler = async (
  req: Request<{}, {}, CreateStoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    user._id = res.locals.user._id;
    const story = await createStory({
      title: req.body.title,
      story: req.body.story,
      status: req.body.status,
      user: user._id
    });

    res.status(201).json({
      status: 'success',
      data: {
        story
      }
    });
  } catch (err: any) {
    next(err);
  }
};
