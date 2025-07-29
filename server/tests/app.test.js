const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
  describe('POST /login', () => {
    it('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'password' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token', 'fake-jwt-token');
    });

    it('should fail login with invalid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'wrong', password: 'wrongpass' });

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });
  });

  describe('Todos API', () => {
    let createdTodoId;

    it('GET /todos should return empty array initially', async () => {
      const res = await request(app).get('/todos');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });

    it('POST /todos should create a new todo', async () => {
      const res = await request(app)
        .post('/todos')
        .send({ text: 'Test todo' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.text).toBe('Test todo');

      createdTodoId = res.body.id;  
    });

    it('GET /todos should return array with the new todo', async () => {
      const res = await request(app).get('/todos');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty('id', createdTodoId);
      expect(res.body[0].text).toBe('Test todo');
    });

    it('PUT /todos/:id should update existing todo', async () => {
      const res = await request(app)
        .put(`/todos/${createdTodoId}`)
        .send({ text: 'Updated todo' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', createdTodoId);
      expect(res.body.text).toBe('Updated todo');
    });

    it('PUT /todos/:id should return 404 for invalid id', async () => {
      const res = await request(app)
        .put('/todos/9999')
        .send({ text: 'No todo' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error', 'Todo not found');
    });

    it('DELETE /todos/:id should delete the todo', async () => {
      const res = await request(app).delete(`/todos/${createdTodoId}`);

      expect(res.statusCode).toBe(204);
    });

    it('GET /todos should return empty array after delete', async () => {
      const res = await request(app).get('/todos');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });
});
