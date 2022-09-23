export default {
  port: 8000,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 59,
  origin: 'http://localhost:3000',
  // accessTokenPrivateKey: 'ACCESS_TOKEN_PRIVATE_KEY',
  // accessTokenPublicKey: 'ACCESS_TOKEN_PUBLIC_KEY'
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  refereshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY
};
