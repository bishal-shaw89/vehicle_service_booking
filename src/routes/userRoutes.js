const express = require('express');
const { check } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// Route for user registration
router.post(
    '/register',
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        check('vehicles').isArray().withMessage('Vehicles must be provided as an array')
    ],
    validationMiddleware.validate,
    userController.register
);

// Route for user login
router.post(
    '/login',
    [
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').notEmpty().withMessage('Password is required')
    ],
    validationMiddleware.validate,
    userController.login
);

// Route for users to view booking history
router.get(
    '/bookingHistory',
    authMiddleware.authenticateUser,
    roleMiddleware('user'),
    userController.viewBookingHistory
);

module.exports = router;
