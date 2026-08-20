process.env.JWT_SECRET = 'test-secret';
const request = require('supertest');
const { app } = require('../../app');

test('health endpoint responds', async () => { const response = await request(app).get('/health'); expect(response.statusCode).toBe(200); expect(response.body.status).toBe('ok'); });
test('event writes require authentication', async () => { const response = await request(app).post('/api/events').send({}); expect(response.statusCode).toBe(401); });
test('unknown routes return consistent errors', async () => { const response = await request(app).get('/missing'); expect(response.statusCode).toBe(404); expect(response.body.status).toBe('fail'); });
