import express from 'express';
import { googleOauthHandler } from '../../controllers/auth';

const router = express.Router();

router.get('/oauth/google', googleOauthHandler);

export default router;
