import express from 'express';
import {
  createStoryHandler,
  getStoryHandler,
  getStoryByIdHanlder,
  updateStoryHandler,
  removeStoryByIdHanlder,
  getStoryByOneUserHanlder
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

// Delete a particular story
router.delete('/:id', removeStoryByIdHanlder);

// Get all stories  route
router.get('/user/:id', getStoryByOneUserHanlder);

export default router;
