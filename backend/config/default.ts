require('dotenv').config();
export default {
  port: 8000,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 59,
  origin: 'http://localhost:3000',
  // origin: process.env.ORIGIN,
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
    user: 'ezekiel.heathcote91@ethereal.email',
    pass: 'PHF7qyz8Q3PR49FSwr',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false
  },
  logLevel: 'info',

  mongoAppUrl: `mongodb://${process.env.MONGO_LOCAL_PORT}/${process.env.MONGO_LOCAL_NAME}`,
  environment: process.env.NODE_ENV,
  swaggerOptions: {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Library API',
        version: '1.0.0'
      }
    },
    apis: ['../src/routes/*/*.ts', '../src/routes/*/*.js'],
    servers: [
      {
        url: `http://localhost:8000`
      }
    ]
  }
};
