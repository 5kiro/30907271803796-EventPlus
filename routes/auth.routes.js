const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const controller = require('../controllers/auth.controller');
const rules = [body('name').if((value, { req }) => req.path.endsWith('register')).trim().notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })];
router.post('/register', rules, validate, controller.register);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, controller.login);
module.exports = router;
