const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return next(new AppError('You must be logged in to access this route', 401));
  try { req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET); next(); }
  catch (error) { next(new AppError('Invalid or expired token', 401)); }
};
