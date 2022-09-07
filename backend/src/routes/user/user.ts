import { Router, Response } from 'express';
import asyncHandler from '../../utils/asyncHandler';
// import * as UserService from '../../services/user';
// import { UserService } from '../../services/user';
import {
  BadRequestResponse,
  NotFoundResponse
} from '../../core/responseHandler';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    // const newUser = await UserService.create(req.body);
    // console.log('users>>>', newUser);
    // if (!newUser) return new BadRequestResponse().send(res);
    // return res.json(newUser);
  })
);

export default router;
