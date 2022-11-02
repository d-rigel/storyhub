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
  // _id: userId,

  _id: '635c247c4b6c8ca1ef7ce107',
  name: 'run user',
  email: 'run@gmail.com'
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

        expect(body).toEqual({
          _id: expect.any(String),
          title: 'Story three by Run',
          story: 'This is story three by Run',
          status: 'private',
          user: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          _v: 0
        });
      });
    });
  });
});
