import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT, { expiresIn: '30d' });
};

// Register functionality
const register = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            user_id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Login functionality with Bearer Token
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user._id);

    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: `Bearer ${token}`, // Send token in Bearer format
    });
});

// Forceful Logout functionality (Client should handle token removal)
const logout = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Logged out successfully. Please remove the token on the client side.',
    });
});

// Profile functionality (Requires Bearer Token in Authorization header)
const profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        img: user.img,
    });
});

// Exporting the functions
export { register, login, logout, profile };
