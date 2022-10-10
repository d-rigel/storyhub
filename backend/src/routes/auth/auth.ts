import express from 'express';
import {
  loginHandler,
  logoutHandler,
  registerHandler,
  refreshAccessTokenHandler,
  forgetPasswordHandler,
  resetPasswordHandler
} from '../../controllers/auth';
import { requireUser } from '../../middleware/requireUser';
import { deserializeUser } from '../../middleware/deserializeUser';
import { validate } from '../../utils/specValidator';
import {
  createUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema
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

router.post(
  '/resetpassword/:id/:passwordResetCode',
  validate(resetPasswordSchema),
  resetPasswordHandler
);

// ............................................................

// Referesh access token route
router.get('/refresh', refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);

// Logout User
router.get('/logout', logoutHandler);

export default router;
