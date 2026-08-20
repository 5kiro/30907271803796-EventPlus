const router = require('express').Router();
const { body, param } = require('express-validator');
const auth = require('../middleware/requireAuth');
const role = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const controller = require('../controllers/announcement.controller');
router.get('/:eventId', param('eventId').isMongoId(), validate, controller.history);
router.post('/', auth, role('admin'), [body('eventId').isMongoId(), body('text').trim().notEmpty()], validate, controller.create);
module.exports = router;
