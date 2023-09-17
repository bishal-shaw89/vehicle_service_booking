const ServiceBooking = require('../models/ServiceBooking');

const serviceBookingController = {};

// Book a service
serviceBookingController.bookService = async (req, res, next) => {
    try {
        const { user, vehicle, serviceType, date, timeSlot, serviceCenter } = req.body;

        const newBooking = new ServiceBooking({
            user,
            vehicle,
            serviceType,
            date,
            timeSlot,
            serviceCenter,
            status: 'pending'
        });

        await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        next(error);
    }
};

// View booked services for a user
serviceBookingController.viewBookedServices = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const bookings = await ServiceBooking.find({ user: userId }).populate('serviceCenter');

        res.json({ bookings });
    } catch (error) {
        next(error);
    }
};

module.exports = serviceBookingController;
