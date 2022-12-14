import config from 'config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import {
  createUser,
  findUser,
  signToken,
  findUserById,
  findAndUpdateUser
} from '../services/user';
import {
  CreateUserInput,
  LoginUserInput,
  ForgetPasswordInput,
  ResetPasswordInput
} from '../validation-schema/user';
import AppError from '../utils/appError';
import { signJwt, verifyJwt } from '../middleware/jwt';
import redisClient from '../dbs/connectRedis';
import { getGoogleOauthToken, getGoogleUser } from '../services/session';
import log from '../utils/logger';
import sendEmail from '../utils/mailer';
import { nanoid } from 'nanoid';
// Exclude this fields from the response
export const excludedFields = ['password'];

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax'
};

// Cookie options
const refereshTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax'
};

// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true;

export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    });

    res.status(201).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist'
      });
    }
    next(err);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the user from the collection
    const user = await findUser({ email: req.body.email });

    // Check if user exist and password is correct
    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Creating Access and refresh Tokens
    const { access_token, refresh_token } = await signToken(user);

    // Send Access Token in Cookie
    res.cookie('accessToken', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refereshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false
      // secure: false //incl
    });

    // Send Access Token
    res.status(200).json({
      status: 'success',
      access_token
    });
  } catch (err: any) {
    next(err);
  }
};

// Refresh tokens
const logout = (res: Response) => {
  res.cookie('access_token', '', { maxAge: 1 });
  res.cookie('refresh_token', '', { maxAge: 1 });
  res.cookie('logged_in', '', {
    maxAge: 1
  });
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the refresh token from cookie
    const refresh_token = req.cookies.refresh_token as string;

    // Validate the Refresh token
    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      'refereshTokenPublicKey'
    );

    const message = 'Could not refresh access token';
    if (!decoded) {
      return next(new AppError(message, 403));
    }

    // Check if the user has a valid session
    const session = await redisClient.get(decoded.sub);
    if (!session) {
      return next(new AppError(message, 403));
    }

    // Check if the user exist
    const user = await findUserById(JSON.parse(session)._id);

    if (!user) {
      return next(new AppError(message, 403));
    }

    // Sign new access token
    const access_token = signJwt({ sub: user._id }, 'accessTokenPrivateKey', {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`
    });

    // Send the access token as cookie
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false
    });

    // Send response
    res.status(200).json({
      status: 'success',
      access_token
    });
  } catch (err: any) {
    next(err);
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    await redisClient.del(user._id);
    logout(res);
    return res.status(200).json({ status: 'success' });
  } catch (err: any) {
    next(err);
  }
};

export const googleOauthHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the code from the query
    const code = req.query.code as string;
    const pathUrl = (req.query.state as string) || '/';

    if (!code) {
      return next(new AppError('Authorization code not provided!', 401));
    }

    // Use the code to get the id and access tokens
    const { id_token, access_token } = await getGoogleOauthToken({ code });

    // Use the token to get the User
    const { name, verified_email, email, picture } = await getGoogleUser({
      id_token,
      access_token
    });

    // Check if user is verified
    if (!verified_email) {
      return next(new AppError('Google account not verified', 403));
    }

    // Update user if user already exist or create new user
    const user = await findAndUpdateUser(
      { email },
      {
        name,
        photo: picture,
        email,
        provider: 'Google',
        verified: true
      },
      { upsert: true, runValidators: false, new: true, lean: true }
    );

    if (!user)
      return res.redirect(`${config.get<string>('origin')}/oauth/error`);

    // Create access and refresh token
    const { access_token: accessToken, refresh_token } = await signToken(user);

    // Send cookie
    res.cookie('refresh-token', refresh_token, refereshTokenCookieOptions);
    res.cookie('access-token', accessToken, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
      )
    });

    res.redirect(`${config.get<string>('origin')}${pathUrl}`);
  } catch (err: any) {
    console.log('Failed to authorize Google User', err);
    return res.redirect(`${config.get<string>('origin')}/oauth/error`);
  }
};

// ...........................................................
export const forgetPasswordHandler = async (
  req: Request<{}, {}, ForgetPasswordInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    // const message =
    //   'If a user with that email is registered you will receive a password reset email';

    const { email } = req.body;
    const user = await findUser({ email: req.body.email });

    if (!user) {
      return next(
        new AppError(`User with email ${email} does not exists`, 403)
      );
    }

    // if (!user.verified) {
    //   return res.send("User is not verified");
    // }

    const passwordResetCode = nanoid();

    user.passwordResetCode = passwordResetCode;

    await user.save();

    await sendEmail({
      to: user.email,
      from: 'ezekiel.heathcote91@ethereal.email',
      subject: 'Reset your password',
      text: `Password reset code: ${passwordResetCode} | id: ${user._id}`
    });

    res.json({
      status: 'success',
      message: `Password reset email sent to ${email} if it exists in our database `
    });
  } catch (err: any) {
    next(err);
  }
};

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const { passwordResetCode } = req.params;

    const { password } = req.body;

    const user = await findUser({ id: req.params.id });

    if (
      !user ||
      !user.passwordResetCode ||
      user.passwordResetCode !== passwordResetCode
    ) {
      // return res.status(400).send('Could not reset user password');
      return next(new AppError(`Could not reset user password`, 400));
    }

    user.passwordResetCode = null;

    user.password = password;

    await user.save();

    // return res.send('Successfully updated password');
    res.json({
      status: 'success',
      message: `Successfully updated password `
    });
  } catch (err: any) {
    next(err);
  }
}

// ...........................................................
