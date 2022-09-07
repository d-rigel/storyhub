

// import { DocumentDefinition } from 'mongoose';
// import UserModel, { I_UserDocument } from '../models/user';
// import { validateInput } from '../utils/specValidator';
// import { userCreateSchema } from '../validation-schema/user';
// import bcrypt from 'bcrypt';
// import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

// export const SECRET_KEY: Secret = 'sl_myjwtSecret';

// export async function register(
//   user: DocumentDefinition<I_UserDocument>
// ): Promise<void | any> {
//   try {
//     const validateUser = await validateInput(userCreateSchema, user);
//     await UserModel.create(validateUser);
//   } catch (error) {
//     throw error;
//   }
// }

// export async function login(user: DocumentDefinition<I_UserDocument>) {
//   try {
//     const foundUser = await UserModel.findOne({
//       email: user.email,
//       password: user.password
//     });

//     if (!foundUser) {
//       throw new Error('Name of user is not correct');
//     }

//     const isMatch = bcrypt.compareSync(user.password, foundUser.password);
//     if (isMatch) {
//       const token = jwt.sign(
//         { _id: foundUser._id?.toString(), email: foundUser.email },
//         SECRET_KEY,
//         {
//           expiresIn: '2 days'
//         }
//       );

//       // return { user: { _id, name }, token: token };
//       return { user: { _id, name }, token: token };
//     } else {
//       throw new Error('Password is not correct');
//     }
//   } catch (error) {
//     throw error;
//   }
// }

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
