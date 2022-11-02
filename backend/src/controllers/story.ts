import {
  createStory,
  findAllStory,
  findStoryById,
  findAndUpdateStory,
  deleteStory,
  findUserStory
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
      user: user
      // user: req.user
    });

    // const story = await createStory(req.body);

    // res.status(201).json({
    //   status: 'success',
    //   data: {
    //     story
    //   }
    // });
    res.send(story);
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
      return next(new AppError('Story not found', 404));
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
    const user = await res.locals.user;
    const { id } = req.params;
    let story = await findStoryById(id.trim());
    console.log(user === story.user);

    if (!story) {
      return next(new AppError('Story not found', 400));
    }

    if (story.user) {
      await findAndUpdateStory(
        { id },
        // req.body,
        {
          title: req.body.title,
          story: req.body.story,
          status: req.body.status,
          user: user
        },
        { upsert: false, runValidators: true, new: true, lean: true }
      );

      res.status(200).json({
        status: 'success',
        message: 'story updated!!!'
      });
    }
  } catch (err: any) {
    next(err);
  }
};

export const removeStoryByIdHanlder = async (
  req: Request<CreateStoryParams['params'], {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const story = await deleteStory(id);

    if (!story) {
      return next(new AppError('Story not found', 400));
    }
    res.status(200).json({
      status: 'success',
      message: 'Story deleted!'
    });
  } catch (err: any) {
    next(err);
  }
};

export const getStoryByOneUserHanlder = async (
  req: Request<CreateStoryParams['params'], {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const story = await findUserStory(id);

    if (!story) {
      return next(new AppError('Story not found', 400));
    }
    res.status(200).json({
      status: 'success',
      data: {
        story
      }
    });
  } catch (err: any) {
    next(err);
  }
};
