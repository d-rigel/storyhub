### 1. Node.js + TypeScript + MongoDB: JWT Authentication

[Node.js + TypeScript + MongoDB: JWT Authentication]

### 2. Node.js + TypeScript + MongoDB: JWT Refresh Token

[Node.js + TypeScript + MongoDB: JWT Refresh Token]

### 3. Google OAuth Authentication with React.js and Node.js (No Passport)

[Google OAuth Authentication with React.js and Node.js (No Passport)]

### 4. GitHub OAuth Authentication React.js and Node.js(No Passport)

### user auth API router

| #   | Routers                          | Verbs | Progress | Is Private | Description                            |
| --- | -------------------------------- | ----- | -------- | ---------- | -------------------------------------- |
| 1   | "/api/auth/register"             | POST  | Done     | no         | Register a new user                    |
| 2   | "/api/auth/login"                | POST  | Done     | yes        | Login a register user and get a token  |
| 3   | "/api/auth/refresh"              | GET   | Done     | yes        | Get a refresh token when token expires |
| 4   | "/api/users"                     | GET   | Done     | yes        | Get all registered users               |
| 5   | "/api/users/me"                  | GET   | Done     | yes        | Get logged in user with auth token     |
| 6   | "/api/sessions/oauth/google"     | GET   | Done     | no         | Google oauth endpoint                  |
| 7   | "/api/auth/forgotpassword"       | POST  | done     | no         | User request for new password          |
| 8   | "api/auth/resetpassword/:id/:pin | POST  | done     | yes        | User update password                   |
