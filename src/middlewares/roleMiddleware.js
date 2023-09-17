const roleMiddleware = (role) => {
    return (req, res, next) => {
        const user = req.user;

        if (user && user.role === role) {
            // User has the required role, grant access
            next();
        } else {
            // User does not have the required role, deny access
            return res.status(403).json({ message: 'Access forbidden' });
        }
    };
};

module.exports = roleMiddleware;
