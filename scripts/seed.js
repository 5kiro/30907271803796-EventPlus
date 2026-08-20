require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Event = require('../models/event.model');
const Registration = require('../models/registration.model');
const Message = require('../models/message.model');

(async () => {
  await connectDB();
  await Message.deleteMany(); await Registration.deleteMany(); await Event.deleteMany(); await Category.deleteMany(); await User.deleteMany();
  const admin = await User.create({ name: 'EventPulse Admin', email: 'admin@eventpulse.test', password: await bcrypt.hash('Admin123!', 12), role: 'admin' });
  const categories = await Category.insertMany([{ name: 'Music', description: 'Live music and performances' }, { name: 'Tech', description: 'Technology and innovation' }, { name: 'Sports', description: 'Sports and fitness' }]);
  await Event.insertMany([
    ...categories.map((category, index) => ({ title: `${category.name} Showcase`, description: `A community ${category.name.toLowerCase()} event`, category: category._id, date: new Date(Date.now() + (index + 1) * 86400000), city: index === 0 ? 'Cairo' : 'Alexandria', venue: 'EventPulse Hall', capacity: 100, organizer: admin._id })),
    { title: 'Community Meetup', description: 'An open EventPulse community gathering', category: categories[0]._id, date: new Date(Date.now() + 4 * 86400000), city: 'Giza', venue: 'Community Center', capacity: 75, organizer: admin._id }
  ]);
  console.log('Seed complete. Admin: admin@eventpulse.test / Admin123!');
  process.exit(0);
})().catch((error) => { console.error(error); process.exit(1); });
