import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';


// Handling registration
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT, {
        expiresIn: '30d',
    });

   
};
const register = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    // Validation logic
    if (!username || !password || !email) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
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
            phone: user.phone,
            image:user.img

            
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


//login functionality 
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validation logic
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(400);
        throw new Error('Invalid credentials');
    }
    //generate token

    const token=generateToken(user._id);
    //set the cookie 
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Use 'None' in production and 'Lax' in development
    });
    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: token,
       
    });
});
//logout functionality 
const logout = asyncHandler(async (req, res) => { 
    res.clearCookie('token', { path: '/' });
    res.status(200).json({
        message: 'Logged out successfully',
    });
});


const profile = asyncHandler(async (req, res) => {
   
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const firstName = user.username.split(' ')[0];

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        img:user.img
    });
});


//exporting the functions

export  { register, login ,logout ,profile };