const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const todoItemsModel = require('../models/todoItems'); // Make sure this path is correct

const app = express();

// Replace with your actual MongoDB connection URL
mongoose.connect('mongodb://localhost:27017/todo-app-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.json());
app.use('/', require('../routes/todoRoutes')); // Make sure this path is correct

// Jest test case
describe('Todo Routes', () => {
  beforeAll(async () => {
    // Clear the todoItems collection before running tests
    await todoItemsModel.deleteMany({});
  });

  afterAll(async () => {
    // Close the MongoDB connection after all tests
    await mongoose.connection.close();
  });

  it('should add a new todo item', async () => {
    const newItem = { item: 'Test Todo' };

    const response = await request(app)
      .post('/api/item')
      .send(newItem);

    expect(response.status).toBe(200);
    expect(response.body.item).toBe('Test Todo');
  });

  it('should get all todo items', async () => {
    const response = await request(app).get('/api/items');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update a todo item', async () => {
    const newItem = await todoItemsModel.create({ item: 'To be updated' });
    const updatedItem = { item: 'Updated Todo' };

    const response = await request(app)
      .put(`/api/item/${newItem._id}`)
      .send(updatedItem);

    expect(response.status).toBe(200);
    expect(response.body).toBe('Item Updated');
  });

  it('should delete a todo item', async () => {
    const newItem = await todoItemsModel.create({ item: 'To be deleted' });

    const response = await request(app).delete(`/api/item/${newItem._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBe('Item Deleted');
  });
});
