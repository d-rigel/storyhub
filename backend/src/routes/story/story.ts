import express from 'express';
import {
  createStoryHandler,
  getStoryHandler,
  getStoryByIdHanlder,
  updateStoryHandler
} from '../../controllers/story';
import { validate } from '../../utils/specValidator';
import { createStorySchema } from '../../validation-schema/story';
import { deserializeUser } from '../../middleware/deserializeUser';
import { requireUser } from '../../middleware/requireUser';

const router = express.Router();

// Endpoints below this are protected
router.use(deserializeUser, requireUser);

// Create story route
router.post('/publish', validate(createStorySchema), createStoryHandler);

// Get all stories  route
router.get('/', getStoryHandler);

// Get all stories  route
router.get('/:id', getStoryByIdHanlder);

// Update a particular story
router.put('/:id', updateStoryHandler);

export default router;
