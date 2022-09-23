import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';
// const { accessTokenPrivateKey, accessTokenPublicKey, "refreshTokenPrivate, refereshTokenPublic } = require('../config');

export const signJwt = (
  payload: Object,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(
    // <string>accessTokenPrivateKey,

    config.get<string>(key),
    'base64'
  ).toString('ascii');

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
};

export const verifyJwt = <T>(
  token: string,
  key: 'accessTokenPublicKey' | 'refereshTokenPublicKey'
): T | null => {
  try {
    const publicKey = Buffer.from(
      // <string>accessTokenPublicKey,

      config.get<string>(key),

      'base64'
    ).toString('ascii');

    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
