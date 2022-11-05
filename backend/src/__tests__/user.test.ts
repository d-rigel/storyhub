import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import * as UserService from '../services/user';

const userId = new mongoose.Types.ObjectId() as any;

const userPayload = {
  _id: userId,
  email: 'freeuser@mail.com',
  name: 'Free Man'
};

const userInput = {
  name: 'run user',
  email: 'run@gmail.com',
  password: 'password123',
  passwordConfirm: 'password123'
};

describe('user', () => {
  // user registration

  describe('user registration', () => {
    describe('given the username and password are valid', () => {
      it('should return the user payload', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          // @ts-ignores
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/auth/register')
          .send(userInput);

        expect(statusCode).toBe(201);

        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    //   describe("given the passwords do not match", () => {
    //     it("should return a 400", async () => {
    //       const createUserServiceMock = jest
    //         .spyOn(UserService, "createUser")
    //         // @ts-ignore
    //         .mockReturnValueOnce(userPayload);

    //       const { statusCode } = await supertest(app)
    //         .post("/api/auth/register")
    //         .send({ ...userInput, passwordConfirmation: "doesnotmatch" });

    //       expect(statusCode).toBe(400);

    //       expect(createUserServiceMock).not.toHaveBeenCalled();
    //     });
    //   });

    //   describe("given the user service throws", () => {
    //     it("should return a 409 error", async () => {
    //       const createUserServiceMock = jest
    //         .spyOn(UserService, "createUser")
    //         .mockRejectedValueOnce("Oh no! :(");

    //       const { statusCode } = await supertest(createServer())
    //         .post("/api/auth/register")
    //         .send(userInput);

    //       expect(statusCode).toBe(409);

    //       expect(createUserServiceMock).toHaveBeenCalled();
    //     });
    //   });
  });

  // describe("create user session", () => {
  //   describe("given the username and password are valid", () => {
  //     it("should return a signed accessToken & refresh token", async () => {
  //       jest
  //         .spyOn(UserService, "validatePassword")
  //         // @ts-ignore
  //         .mockReturnValue(userPayload);

  //       jest
  //         .spyOn(SessionService, "createSession")
  //         // @ts-ignore
  //         .mockReturnValue(sessionPayload);

  //       const req = {
  //         get: () => {
  //           return "a user agent";
  //         },
  //         body: {
  //           email: "test@example.com",
  //           password: "Password123",
  //         },
  //       };

  //       const send = jest.fn();

  //       const res = {
  //         send,
  //       };

  //       // @ts-ignore
  //       await createUserSessionHandler(req, res);

  //       expect(send).toHaveBeenCalledWith({
  //         accessToken: expect.any(String),
  //         refreshToken: expect.any(String),
  //       });
  //     });
  //   });
  // });
});
