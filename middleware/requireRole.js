const AppError = require('../utils/AppError');
module.exports = (...roles) => (req, res, next) => roles.includes(req.user.role) ? next() : next(new AppError('You do not have permission to perform this action', 403));
