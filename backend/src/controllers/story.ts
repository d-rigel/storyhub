import { createStory, findAllStory } from '../services/story';
import { NextFunction, Request, Response } from 'express';
import { CreateStoryInput } from '../validation-schema/story';
import { Story } from '../models/story';

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

export const getStoryHandler = async (
  req: Request<{}, {}, CreateStoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const stories = await findAllStory();
    res.status(200).json({
      status: 'success',
      // result: stories
      data: {
        stories
      }
    });
  } catch (err: any) {
    next(err);
  }
};
