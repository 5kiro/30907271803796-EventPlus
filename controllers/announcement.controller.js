const Message = require('../models/message.model');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.history = asyncHandler(async (req, res) => {
  const data = await Message.find({ event: req.params.eventId }).populate('sender', 'name email').sort({ createdAt: 1 });
  res.json({ status: 'success', data });
});

exports.create = asyncHandler(async (req, res, next) => {
  const { eventId, text } = req.body;
  const message = await Message.create({ event: eventId, sender: req.user.userId, text });
  const populated = await message.populate('sender', 'name email');
  const io = req.app.get('io');
  if (io) io.to(eventId).emit('announcement', populated);
  res.status(201).json({ status: 'success', data: populated });
});
