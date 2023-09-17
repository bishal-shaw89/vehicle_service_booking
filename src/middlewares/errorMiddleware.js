const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Default to a generic 500 Internal Server Error
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorMiddleware;
