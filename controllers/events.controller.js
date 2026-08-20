const mongoose = require('mongoose');
const Event = require('../models/event.model');
const Registration = require('../models/registration.model');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  const { category, city, startDate, endDate, search } = req.query;
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100);
  const filter = {};
  if (category) { if (!mongoose.isValidObjectId(category)) throw new AppError('Invalid category id', 400); filter.category = category; }
  if (city) filter.city = city;
  if (startDate || endDate) { filter.date = {}; if (startDate) filter.date.$gte = new Date(startDate); if (endDate) filter.date.$lte = new Date(endDate); }
  if (search) filter.$or = [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
  const field = req.query.sortBy === 'registrations' ? 'registrationCount' : 'date';
  const sort = { [field]: req.query.order === 'desc' ? -1 : 1 };
  const [data, total] = await Promise.all([
    Event.aggregate([
      { $match: filter },
      { $lookup: { from: 'registrations', localField: '_id', foreignField: 'event', as: 'registrations' } },
      { $addFields: { registrationCount: { $size: '$registrations' } } },
      { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $lookup: { from: 'users', localField: 'organizer', foreignField: '_id', as: 'organizer' } },
      { $unwind: '$organizer' },
      { $project: { registrations: 0, 'organizer.password': 0 } },
      { $sort: sort },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ]),
    Event.countDocuments(filter)
  ]);
  res.json({ status: 'success', total, page, limit, totalPages: Math.ceil(total / limit), data });
});

exports.getOne = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id).populate('category').populate('organizer', 'name email');
  if (!event) return next(new AppError('Event not found', 404));
  res.json({ status: 'success', data: event });
});

exports.create = asyncHandler(async (req, res) => {
  const event = await Event.create({ ...req.body, organizer: req.user.userId });
  res.status(201).json({ status: 'success', data: event });
});

exports.update = asyncHandler(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('category').populate('organizer', 'name email');
  if (!event) return next(new AppError('Event not found', 404));
  res.json({ status: 'success', data: event });
});

exports.remove = asyncHandler(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return next(new AppError('Event not found', 404));
  await Registration.deleteMany({ event: event._id });
  res.status(204).send();
});
