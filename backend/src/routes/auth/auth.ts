import express from 'express';
import { loginHandler, registerHandler } from '../../controllers/auth';
import { requireUser } from '../../middleware/requireUser';
import { validate } from '../../utils/specValidator';
import {
  createUserSchema,
  loginUserSchema
} from '../../validation-schema/user';

const router = express.Router();

// Register user route
router.post('/register', validate(createUserSchema), registerHandler);

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler);

export default router;
