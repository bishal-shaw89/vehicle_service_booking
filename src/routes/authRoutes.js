const express = require('express');
const { check } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');
const authController = require('../controllers/authController');

const router = express.Router();

// Route for user registration
router.post(
    '/register',
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    validationMiddleware.validate,
    authController.register
);

// Route for user login
router.post(
    '/login',
    [
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').notEmpty().withMessage('Password is required')
    ],
    validationMiddleware.validate,
    authController.login
);

module.exports = router;
