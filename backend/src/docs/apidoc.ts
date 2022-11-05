import {
  createUserBody,
  createUser,
  getUsers,
  getUser,
  authenticateUserBody,
  authenticateUser
} from './users';

const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'My REST API - Documentation',
    description:
      'This is an api where users can create both public and private stories',
    termsOfService: 'https://mysite.com/terms',
    contact: {
      name: 'Nnadozie Emmanuel',
      email: 'alozie4God@gmail.com',
      url: 'https://dev-emmanuel.herokuapp.com/'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:8000/',
      description: 'Local Server'
    },
    {
      url: 'https://api.mysite.com',
      description: 'Production Server'
    }
  ],
  tags: [
    {
      name: 'Users'
    },
    {
      name: 'Stories'
    }
  ],
  paths: {
    '/api/auth/register': {
      post: createUser
    },
    '/api/users': {
      get: getUsers
    },

    'users/me': {
      get: getUser
    },
    'api/auth/login': {
      post: authenticateUser
    }
    // roles: {
    //   post: createRole,
    //   get: getRoles,
    // },
    // 'roles/{id}': {
    //   delete: deleteRole,
    //   get: getRole,
    //   put: updateRole,
    // },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      createUserBody,
      authenticateUserBody
      // updateUserBody,
      // createOrUpdateRoleBody,
    }
  }
};

export { apiDocumentation };
