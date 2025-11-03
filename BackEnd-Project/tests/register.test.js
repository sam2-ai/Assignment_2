const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;
let app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  // Ensure JWT secret exists for auth tests
  process.env.JWT_SECRET = 'test-secret';
  // Require app after MONGO_URI is set
  app = require('../index');
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongod) await mongod.stop();
});

afterEach(async () => {
  // clear db
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

test('POST /api/register creates a user when payload valid', async () => {
  const res = await request(app)
    .post('/api/register')
    .send({ firstName: 'Test', lastName: 'User', email: 'a@b.com', password: 'secret123', agreeToTerms: true });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('message', 'User registered');
});

test('POST /api/register returns validation errors for missing fields', async () => {
  const res = await request(app).post('/api/register').send({ email: 'bad', password: '123' });
  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty('errors');
  expect(Array.isArray(res.body.errors)).toBe(true);
});
