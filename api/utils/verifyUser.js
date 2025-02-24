import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Named Export
export const verifyUser = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer')
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token provided');
    }

    try {
        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT);

        // Retrieve User from DB
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            res.status(401);
            throw new Error('Not authorized, user not found');
        }

        req.user = user; // Attach user to the request object for further use
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'Not authorized, token failed' }); // Send detailed message
    }
});
