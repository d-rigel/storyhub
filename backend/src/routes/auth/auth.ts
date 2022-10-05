import express from 'express';
import {
  loginHandler,
  logoutHandler,
  registerHandler,
  refreshAccessTokenHandler,
  forgetPasswordHandler
} from '../../controllers/auth';
import { requireUser } from '../../middleware/requireUser';
import { deserializeUser } from '../../middleware/deserializeUser';
import { validate } from '../../utils/specValidator';
import {
  createUserSchema,
  loginUserSchema,
  forgotPasswordSchema
} from '../../validation-schema/user';

const router = express.Router();

// Register user route
router.post('/register', validate(createUserSchema), registerHandler);

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler);

// ............................................................
router.post(
  '/forgotpassword',
  validate(forgotPasswordSchema),
  forgetPasswordHandler
);

// ............................................................

// Referesh access token route
router.get('/refresh', refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);

// Logout User
router.get('/logout', logoutHandler);

export default router;
