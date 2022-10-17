import express from 'express';
import { createStoryHandler, getStoryHandler } from '../../controllers/story';
import { validate } from '../../utils/specValidator';
import { createStorySchema } from '../../validation-schema/story';
import { deserializeUser } from '../../middleware/deserializeUser';
import { requireUser } from '../../middleware/requireUser';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Register user route
router.post('/publish', validate(createStorySchema), createStoryHandler);

// Register user route
router.get('/', getStoryHandler);

export default router;
