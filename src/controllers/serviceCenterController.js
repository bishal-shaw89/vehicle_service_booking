const ServiceCenter = require('../models/ServiceCenter');
const ServiceBooking = require('../models/ServiceBooking');

const serviceCenterController = {};

// View bookings for a service center
serviceCenterController.viewBookings = async (req, res, next) => {
    try {
        const serviceCenterId = req.user._id;

        const bookings = await ServiceBooking.find({ serviceCenter: serviceCenterId }).populate('user');

        res.json({ bookings });
    } catch (error) {
        next(error);
    }
};

// Manage booking (approve, reject, etc.)
serviceCenterController.manageBooking = async (req, res, next) => {
    try {
        const { bookingId, action } = req.body;
        const serviceCenterId = req.user._id;

        // Check if the booking belongs to the service center
        const booking = await ServiceBooking.findOne({ _id: bookingId, serviceCenter: serviceCenterId });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.status !== 'pending') {
            return res.status(400).json({ message: 'Booking is not in pending status' });
        }

        // Perform action (approve, reject, etc.)
        if (action === 'approve') {
            booking.status = 'approved';
        } else if (action === 'reject') {
            booking.status = 'rejected';
        }

        await booking.save();

        res.json({ message: 'Booking updated successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = serviceCenterController;
