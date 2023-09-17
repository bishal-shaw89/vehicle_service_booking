const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    vehicles: [String]
});

// Generate authentication token
userSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ email: user.email }, config.secretKey, { expiresIn: '7d' }); // Token expires in 7 days
    return token;
};

// Find user by credentials for login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return null;
    }

    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
