import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createStory } from '../services/story';
import { signToken } from '../services/user';
import { signJwt } from '../middleware/jwt';
import app from '../../src/app';
import mongoose from 'mongoose';

// @ts-ignore
const userId = new mongoose.Types.ObjectId();

export const storyPayload = {
  title: 'Story for test sake',
  story: 'This is story for test',
  status: 'public',
  user: userId
};

export const userPayload = {
  _id: userId,
  email: 'run@gmail.com',
  name: 'run user'
};

describe('story', () => {
  beforeAll(function startMogo() {
    async () => {
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();

      await mongoose.connect(mongoUri);
    };
    startMogo;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  // const story = await createStory(storyPayload)

  describe('get story route', () => {
    describe('given the story does not exits', () => {
      it('should return a 404', async () => {
        const _id = '123456789';

        await supertest(app).get(`/api/stories/${_id}`).expect(404);
      });
    });

    describe('given the stories does exist', () => {
      it('should return a 200 status and the story', async () => {
        const story = await createStory(storyPayload);

        const { body, statusCode } = await supertest(app).get(
          //@ts-ignore
          `/api/stories/${story._id}`
        );

        expect(statusCode).toBe(200);
        //@ts-ignore
        expect(body._id).toBe(story._id);
      });
    });
  });

  describe('create story route', () => {
    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        const { statusCode } = await supertest(app).post(
          '/api/stories/publish'
        );

        expect(statusCode).toBe(403);
      });
    });

    describe('given the user is logged in', () => {
      it('should return a 200 and create the product', async () => {
        //@ts-ignore
        // const jwt = signToken(userPayload);
        const jwt = await signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/stories/publish')
          .set('Authorization', `Bearer ${jwt}`)
          .send(storyPayload);

        expect(statusCode).toBe(201);

        // expect(body).toEqual({
        //   __v: 0,
        //   _id: expect.any(String),
        //   createdAt: expect.any(String),
        //   description:
        //     "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
        //   image: "https://i.imgur.com/QlRphfQ.jpg",
        //   price: 879.99,
        //   productId: expect.any(String),
        //   title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
        //   updatedAt: expect.any(String),
        //   user: expect.any(String),
        // });
      });
    });
  });
});
