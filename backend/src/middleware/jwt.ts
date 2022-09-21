import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';
const { accessTokenPrivateKey, accessTokenPublicKey } = require('../config');

const accessPriv: string =
  'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCUEFJQkFBSkJBTGRDUC9uQnFPY05qTEY0dlFMRG15M3VjS0grWnFudkZMMFkwUENaTktNOW1LN3RZdFpUCjFGOWQ3b2lGdlJDbnpkNmcvdmdYcnQzaG1HdGh5RGx5N21rQ0F3RUFBUUpCQUxCRDdMMFI1Sis0aktiMjl2WDkKcHZqYTYwTWxLeUl3YjhZaVpIWEhKcllMR2pVM3J5a1gvWVRHdlBrOG5jaitEaHUreGhkOE1FeGVUU3hwaW84UwpTc0VDSVFEd09mcXF1OEdCcS9RcXpqTGcrOU1SOVp3NGttcjNMcmxDQ3p2YXVQQXY1UUloQU1OS3NDRnlpajBrCkdmclVkSFVxTFZvNVAyRGIxRXBhN3o5UU42TjlITFExQWlBRTE1Wlc1S3YwMml0MHhXMC9IYlJXYzFYdnlmdS8KK2NBZ05hdkNMK0lmaFFJaEFNSWRYUkVCL3ZKakRnZktZYStNS3VSQmZ3UFJ2aVBpVzJpOVhYQitEYWY1QWlFQQpoOUU5QXg5RlNvS1B5cmdrSUZQWEl2OVFrK2duZHZSbENGaXArQ1JxcUtFPQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ==';
const accessPublic: string =
  'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZ3d0RRWUpLb1pJaHZjTkFRRUJCUUFEU3dBd1NBSkJBTGRDUC9uQnFPY05qTEY0dlFMRG15M3VjS0grWnFudgpGTDBZMFBDWk5LTTltSzd0WXRaVDFGOWQ3b2lGdlJDbnpkNmcvdmdYcnQzaG1HdGh5RGx5N21rQ0F3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==';

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = Buffer.from(
    <string>accessTokenPrivateKey,
    // accessPriv,

    // config.get<string>('accessTokenPrivateKey'),
    'base64'
  ).toString('ascii');

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(
      <string>accessTokenPublicKey,
      // config.get<string>('accessTokenPublicKey'),
      // accessPublic,
      'base64'
    ).toString('ascii');

    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
