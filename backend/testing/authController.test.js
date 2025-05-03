import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes.js';
import Client from '../models/Client.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

beforeAll(async () => {
  const url = process.env.MONGO_URI;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        Id_client: 1,
        Code_tiers: 'PP02227511',
        Nom_tiers: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'client'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully!');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('role');
  });

  it('should get user profile', async () => {
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    const token = loginRes.body.token;

    const profileRes = await request(app)
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(profileRes.statusCode).toEqual(200);
    expect(profileRes.body).toHaveProperty('email', 'testuser@example.com');
  });
});