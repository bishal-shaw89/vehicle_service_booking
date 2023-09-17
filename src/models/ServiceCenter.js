const mongoose = require('mongoose');

const serviceCenterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    availableServices: [String],
    workingHours: {
        type: String,
        required: true
    }
});

const ServiceCenter = mongoose.model('ServiceCenter', serviceCenterSchema);

module.exports = ServiceCenter;
