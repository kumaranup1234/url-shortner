const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup Handler
async function handleSignup(req, res) {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username) {
        return res.status(400).json({
            error: true,
            message: 'Username is required',
        });
    }
    if (!email) {
        return res.status(400).json({
            error: true,
            message: 'Email is required',
        });
    }
    if (!password) {
        return res.status(400).json({
            error: true,
            message: 'Password is required',
        });
    }

    try {
        // Check if user already exists
        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({
                error: true,
                message: 'User already exists',
            });
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        console.error('Signup Error:', error);
        return res.status(500).json({
            error: true,
            message: 'Server error during signup',
        });
    }
}

// Login Handler
async function handleLogin(req, res) {
    const { email, password } = req.body;

    // Validate required fields
    if (!email) {
        return res.status(400).json({
            error: true,
            message: 'Email is required',
        });
    }
    if (!password) {
        return res.status(400).json({
            error: true,
            message: 'Password is required',
        });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        console.log('User found:', user);
        if (!user) {
            return res.status(401).json({
                error: true,
                message: 'Invalid credentials',
            });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: true,
                message: 'Invalid credentials',
            });
        }

        // Generate JWT token
        console.log(process.env.JWT_SECRET)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('authToken', token, {
            httpOnly: true,   // Prevents JavaScript access on the client side
            secure: process.env.NODE_ENV === 'production', // Ensure cookie is sent over HTTPS only in production
            maxAge:  30 * 24 * 60 * 60 * 1000,  // 30 days expiration time
            sameSite: 'strict' // Helps prevent CSRF attacks
        });

        return res.json({
            success: true,
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({
            error: true,
            message: 'Server error during login',
        });
    }
}

module.exports = {
    handleSignup,
    handleLogin,
};
