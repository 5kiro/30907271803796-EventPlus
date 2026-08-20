const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

function signToken(user) { return jwt.sign({ userId: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }); }

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (await User.exists({ email })) return next(new AppError('Email is already registered', 409));
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
  res.status(201).json({ status: 'success', token: signToken(user), data: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) return next(new AppError('Invalid email or password', 401));
  res.json({ status: 'success', token: signToken(user) });
});
