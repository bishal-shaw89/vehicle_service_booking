const express = require('express');
const { check } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const serviceBookingController = require('../controllers/serviceBookingController');

const router = express.Router();

// Route for booking a service
router.post(
    '/book',
    authMiddleware.authenticateUser,
    [
        check('vehicle').notEmpty().withMessage('Vehicle details are required'),
        check('serviceType').notEmpty().withMessage('Service type is required'),
        check('date').isISO8601().withMessage('Invalid date format'),
        check('timeSlot').notEmpty().withMessage('Time slot is required'),
        check('serviceCenter').notEmpty().withMessage('Service center is required')
    ],
    validationMiddleware.validate,
    serviceBookingController.bookService
);

// Route for viewing booked services for a user
router.get(
    '/view',
    authMiddleware.authenticateUser,
    serviceBookingController.viewBookedServices
);

module.exports = router;
