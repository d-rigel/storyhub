import express from "express"
import { getAllUsersHandler, getMeHandler } from "../../controllers/user"
import { deserializeUser } from "../../middleware/deserializeUser"
import { requireUser } from "../../middleware/requireUser"
import { restrictTo } from "../../middleware/restrictTo"

const router = express.Router()
router.use(deserializeUser, requireUser)

// Admin Get Users route
router.get("/", restrictTo("admin"), getAllUsersHandler)

//Get my info route
router.get("/me", getMeHandler)

export default router









































// import { Router, Response } from 'express';
// // import asyncHandler from '../../utils/asyncHandler';
// // import * as UserService from '../../services/user';
// // import { UserService } from '../../services/user';
// import {
//   BadRequestResponse,
//   NotFoundResponse
// } from '../../core/responseHandler';

// const router = Router();

// // router.post(
// //   '/',
// //   asyncHandler(async (req: any, res: Response) => {
// //     // const newUser = await UserService.create(req.body);
// //     // console.log('users>>>', newUser);
// //     // if (!newUser) return new BadRequestResponse().send(res);
// //     // return res.json(newUser);
// //   })
// // );

// export default router;
