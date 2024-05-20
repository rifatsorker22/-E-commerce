const jwt = require('jsonwebtoken');
const User = require('../model/auth.model');

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        token = token.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, 'secret-key');
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        next(error); // Pass the error to Express error handling middleware
    }
};

const authRole = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (userRole !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

module.exports = { auth, authRole };
