const router = require('express').Router();
const { body, param } = require('express-validator');
const auth = require('../middleware/requireAuth');
const validate = require('../middleware/validate');
const controller = require('../controllers/registration.controller');
router.use(auth);
router.post('/', [body().custom((value) => {
	if (!value.event && !value.eventId) throw new Error('event or eventId is required');
	if (value.event && !require('mongoose').isValidObjectId(value.event)) throw new Error('event must be a valid MongoId');
	if (value.eventId && !require('mongoose').isValidObjectId(value.eventId)) throw new Error('eventId must be a valid MongoId');
	return true;
}), body('event').optional().isMongoId(), body('eventId').optional().isMongoId()], validate, controller.create);
router.get('/my', controller.mine);
router.delete('/:id', param('id').isMongoId(), validate, controller.cancel);
module.exports = router;
