const userResponse = {
  _id: {
    type: 'string',
    example: '60564fcb544047cdc3844818'
  },
  name: {
    type: 'string',
    example: 'John Snow'
  },
  email: {
    type: 'string',
    example: 'john.snow@email.com'
  },
  role: {
    type: 'string',
    example: 'user'
  },
  photo: {
    type: 'string',
    example: 'default.png'
  },
  provider: {
    type: 'string',
    example: 'local'
  },
  verified: {
    type: 'boolean',
    example: false
  },
  createdAt: {
    type: 'string',
    example: '2021-03-20T19:40:59.495Z'
  },
  updatedAt: {
    type: 'string',
    example: '2021-03-20T21:23:10.879Z'
  }
};

const internalServerError = {
  description: 'Internal Server Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Internal Server Error'
          }
        }
      }
    }
  }
};

const userNotFound = {
  description: 'Resource not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'User not found'
          }
        }
      }
    }
  }
};

const invalidUserData = {
  description: 'Invalid Data provided',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'The fields field1, field2 and field3 are required'
          }
        }
      }
    }
  }
};

const security = [
  {
    bearerAuth: []
  }
];

const createUserBody = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'John Snow'
    },
    email: {
      type: 'string',
      example: 'john.snow@email.com'
    },
    password: {
      type: 'string',
      description: "unencrypted user's password",
      example: '!1234aWe1Ro3$#'
    },
    passwordConfirm: {
      type: 'string',
      example: '!1234aWe1Ro3$#'
    }
  }
};

const createUser = {
  tags: ['Users'],
  description: 'Create a new user in the system',
  operationId: 'createUser',
  security: [
    {
      bearerAuth: []
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/createUserBody'
        }
      }
    },
    required: true
  },
  responses: {
    '201': {
      description: 'User created successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '60564fcb544047cdc3844818'
              },
              name: {
                type: 'string',
                example: 'John Snow'
              },
              email: {
                type: 'string',
                example: 'john.snow@email.com'
              },
              role: {
                type: 'string',
                example: 'user'
              },
              verified: {
                type: 'boolean',
                example: false
              },
              provider: {
                type: 'string',
                example: 'local'
              },
              createdAt: {
                type: 'string',
                example: '2021-03-20T19:40:59.495Z'
              },
              updatedAt: {
                type: 'string',
                example: '2021-03-20T21:23:10.879Z'
              }
            }
          }
        }
      }
    },
    '422': invalidUserData,
    '500': internalServerError
  }
};

const getUsers = {
  tags: ['Users'],
  description: 'Retrieve all the users',
  operationId: 'getUsers',
  security: [
    {
      bearerAuth: []
    }
  ],
  responses: {
    '200': {
      description: 'Users retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: userResponse
            }
          }
        }
      }
    },
    '500': internalServerError
  }
};

const getUser = {
  tags: ['Users'],
  description: 'Retrieve one user',
  operationId: 'getUser',
  security: [
    {
      bearerAuth: []
    }
  ],

  responses: {
    '200': {
      description: 'User retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: userResponse
          }
        }
      }
    },
    '404': userNotFound,
    '500': internalServerError
  }
};

const authenticateUserBody = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'john.snow@email.com'
    },
    password: {
      type: 'string',
      description: "unencrypted user's password",
      example: '!1234aWe1Ro3$#'
    }
  }
};

const authenticateUser = {
  tags: ['Users'],
  description:
    'Authenticate user credentials and return a JWT token and a cookie ',
  operationId: 'authenticateUser',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/authenticateUserBody'
        }
      }
    },
    required: true
  },
  responses: {
    '200': {
      description: 'A JWT access token and success status',
      headers: {
        setCookie: {
          description: 'refreshToken',
          schema: {
            type: 'string',
            example:
              'referesh_token=51872eca5efedcf424db4cf5afd16a9d00ad25b743a034c9c221afc85d18dcd5e4ad6e3f08607550; Path=/; Expires=Tue, 16 Jun 2022 09:14:17 GMT; HttpOnly'
            // content:'
          }
        }
      },
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              access_token: {
                type: 'string',
                example:
                  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzVjMjQ3YzRiNmM4Y2ExZWY3Y2UxMDciLCJpYXQiOjE2Njc1OTk1NDcsImV4cCI6MTY2NzYwMDQ0N30.lT34b8vJ70UVrpNRSyeXE5KU2KEUReRbIf70RXuKISr_tXFo4c7U5MJMBIRpevDh-V_JZFCZqT_oc7qhlOWzmw'
              }
            }
          }
        }
      }
    },
    '401': invalidUserData,
    '500': internalServerError
  }
};

export {
  createUserBody,
  createUser,
  getUsers,
  getUser,
  authenticateUserBody,
  authenticateUser
};
