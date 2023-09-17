const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

const authMiddleware = {};

// Middleware to authenticate user based on JWT
authMiddleware.authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }

    try {
        const decoded = jwt.verify(token, config.secretKey);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("error ->", error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
