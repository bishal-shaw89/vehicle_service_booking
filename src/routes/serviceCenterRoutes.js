const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const serviceCenterController = require('../controllers/serviceCenterController');

const router = express.Router();

// Route for service center to view bookings
router.get(
    '/viewBookings',
    authMiddleware.authenticateUser,
    roleMiddleware('serviceCenter'),
    serviceCenterController.viewBookings
);

// Route for service center to manage bookings
router.post(
    '/manageBooking',
    authMiddleware.authenticateUser,
    roleMiddleware('serviceCenter'),
    serviceCenterController.manageBooking
);

module.exports = router;
