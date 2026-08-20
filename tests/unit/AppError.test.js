const AppError = require('../../utils/AppError');

test('creates a client failure', () => { const error = new AppError('Not found', 404); expect(error).toBeInstanceOf(Error); expect(error.statusCode).toBe(404); expect(error.status).toBe('fail'); expect(error.isOperational).toBe(true); });
test('creates a server error status', () => { expect(new AppError('Server error', 500).status).toBe('error'); });
