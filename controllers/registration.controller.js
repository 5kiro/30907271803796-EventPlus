const Event = require('../models/event.model');
const Registration = require('../models/registration.model');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.create = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.body.event || req.body.eventId);
  if (!event) return next(new AppError('Event not found', 404));
  if (await Registration.exists({ event: event._id, attendee: req.user.userId })) return next(new AppError('You are already registered for this event', 409));
  if (await Registration.countDocuments({ event: event._id }) >= event.capacity) return next(new AppError('This event is full', 400));
  try { const registration = await Registration.create({ event: event._id, attendee: req.user.userId }); res.status(201).json({ status: 'success', data: registration }); }
  catch (error) { if (error.code === 11000) return next(new AppError('You are already registered for this event', 409)); throw error; }
});

exports.mine = asyncHandler(async (req, res) => {
  const data = await Registration.find({ attendee: req.user.userId }).populate('event').sort({ createdAt: -1 });
  res.json({ status: 'success', data });
});

exports.cancel = asyncHandler(async (req, res, next) => {
  const registration = await Registration.findById(req.params.id);
  if (!registration) return next(new AppError('Registration not found', 404));
  if (registration.attendee.toString() !== req.user.userId) return next(new AppError('You can only cancel your own registration', 403));
  await registration.deleteOne();
  res.json({ status: 'success', message: 'Registration cancelled successfully' });
});
