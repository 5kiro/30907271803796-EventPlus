const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ status: 'fail', errors: errors.array().map(({ path, msg }) => ({ field: path, message: msg })) });
  next();
};
