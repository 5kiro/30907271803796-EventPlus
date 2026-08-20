const asyncHandler = require('../../utils/asyncHandler');

test('forwards request arguments', async () => { const fn = jest.fn(async () => undefined); const next = jest.fn(); asyncHandler(fn)('req', 'res', next); await new Promise(setImmediate); expect(fn).toHaveBeenCalledWith('req', 'res', next); });
test('forwards rejected promises', async () => { const error = new Error('failed'); const next = jest.fn(); asyncHandler(async () => { throw error; })({}, {}, next); await new Promise(setImmediate); expect(next).toHaveBeenCalledWith(error); });
