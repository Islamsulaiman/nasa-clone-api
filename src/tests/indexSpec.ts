/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '..';
import User from '../models/users';

describe('POST /api/users', () => {
  afterAll(async () => {
    // Disconnect from the test database after running the tests
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Remove all users from the test database after each test
    await User.deleteMany({});
  });

  it('should create a new user', async () => {
    const user = {
      fullName: 'John Doe',
      email: 'john@example.com',
      userName: 'johndoe',
      password: 'password',
      image: 'https://example.com/image.png',
    };

    const response = await request(app)
      .post('/register')
      .send(user)
      .expect(200);

    expect(response.body.fullName).toBe(user.fullName);
    expect(response.body.email).toBe(user.email);
    expect(response.body.userName).toBe(user.userName);
    expect(response.body.image).toBe(user.image);

    const dbUser = await User.findOne({ email: user.email });
    expect(dbUser).toBeDefined();
    expect(dbUser!.password).not.toBe(user.password); // Check that the password was hashed
  });

  it('should return an error if user data is invalid', async () => {
    // Test invalid user data
    const user = {
      fullName: 'John Doe',
      email: 'invalid-email',
      userName: 'johndoe',
      password: 'password',
      image: 'https://example.com/image.png',
    };

    const response = await request(app)
      .post('/register')
      .send(user)
      .expect(400);

    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe('Invalid user data');
  });
});
