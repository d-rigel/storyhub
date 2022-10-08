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
  refereshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,

  googleClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  googleOauthRedirect: process.env.GOOGLE_OAUTH_REDIRECT_URL,

  smtp: {
    user: 'flavie.abshire1@ethereal.email',
    pass: '7zTzg6QrUze135gFwf',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false
  },
  logLevel: 'info'
};
