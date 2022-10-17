import express from 'express';
import { createStoryHandler } from '../../controllers/story';
import { validate } from '../../utils/specValidator';
import { createStorySchema } from '../../validation-schema/story';
import { deserializeUser } from '../../middleware/deserializeUser';
import { requireUser } from '../../middleware/requireUser';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Register user route
router.post('/publish', validate(createStorySchema), createStoryHandler);

export default router;
