import {
  createStory,
  findAllStory,
  findStoryById,
  findAndUpdateStory
} from '../services/story';
import { NextFunction, Request, Response } from 'express';
import {
  CreateStoryInput,
  CreateStoryParams
} from '../validation-schema/story';
import AppError from '../utils/appError';

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
      // user: req.user
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
    if (!stories) {
      return next(new AppError('Stories not found', 400));
    }
    res.status(200).json({
      status: 'success',
      data: {
        stories
      }
    });
  } catch (err: any) {
    next(err);
  }
};

export const getStoryByIdHanlder = async (
  req: Request<CreateStoryParams['params'], {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const story = await findStoryById(id);

    if (!story) {
      return next(new AppError('Story not found', 400));
    }
    res.status(200).json({
      status: 'success',
      // result: stories
      data: {
        story
      }
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateStoryHandler = async (
  req: Request<CreateStoryParams['params'], {}, CreateStoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const story = await findAndUpdateStory(
      { id },
      {
        title: req.body.title,
        story: req.body.story,
        status: req.body.status
        // user: user._id
      },
      // { runValidators: true, new: true }
      { runValidators: true, new: true, lean: true }
    );

    if (!story) {
      return next(new AppError('Story not found', 400));
    }

    res.status(200).json({
      message: 'story updated',
      data: {
        story
      }
    });
  } catch (err: any) {
    next(err);
  }
};
