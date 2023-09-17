const User = require('../models/User');
const ServiceBooking = require('../models/ServiceBooking');

const userController = {};

// Register a new user
userController.register = async (req, res, next) => {
    try {
        const { name, email, password, vehicles } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password, vehicles });

        await newUser.save();

        const token = newUser.generateAuthToken();

        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};

// Log in a user
userController.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByCredentials(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = user.generateAuthToken();

        res.json({ token });
    } catch (error) {
        next(error);
    }
};

// View booking history
userController.viewBookingHistory = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const bookings = await ServiceBooking.find({ user: userId }).populate('serviceCenter');

        res.json({ bookings });
    } catch (error) {
        next(error);
    }
};

module.exports = userController;
