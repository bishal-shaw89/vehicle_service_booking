const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/config');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const serviceBookingRoutes = require('./src/routes/serviceBookingRoutes');
const serviceCenterRoutes = require('./src/routes/serviceCenterRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/service-bookings', serviceBookingRoutes);
app.use('/service-centers', serviceCenterRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
