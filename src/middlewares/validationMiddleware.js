const { validationResult } = require('express-validator');

const validationMiddleware = {};

// Middleware function to handle validation errors
validationMiddleware.validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Validation errors found
        return res.status(422).json({ errors: errors.array() });
    }

    // No validation errors, continue to the next middleware or route handler
    next();
};

module.exports = validationMiddleware;
