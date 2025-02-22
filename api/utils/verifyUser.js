// File: /C:/Users/User/Desktop/bookingsystem/api/utils/verifyUser.js

import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Named Export
export const verifyUser = asyncHandler(async (req, res, next) => {
    // **Extract Token**
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token provided');
    }

    try {
        // **Verify Token**
        const decoded = jwt.verify(token, process.env.JWT);
        
        // **Retrieve User from DB**
        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized, user not found');
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
});