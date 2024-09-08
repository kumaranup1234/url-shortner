const User = require('../models/User');
const ApiKey = require('../models/ApiKey');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: UUIDv4} = require("uuid")

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
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });

        // Set the token as a cookie
        res.cookie('authToken', token, {
            httpOnly: true,   // Prevents JavaScript access on the client side
            secure: process.env.NODE_ENV === 'production', // Ensure cookie is sent over HTTPS only in production
            maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days expiration time
            sameSite: 'none' // 'none' for cross-domain, 'strict' for same-site
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

async function getUserProfile(req, res){
    try {
        const userId = req.user._id;
        //console.log(userId);

        const user = await User.findById(userId).populate({
            path: 'urls',
            select: 'originalUrl shortUrl totalClicks createdAt',
        });

        //console.log(user);

        if (!user){
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        return res.status(200).json({
            error: false,
            data: {
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                apiKey: user.apiKey,
                urls: user.urls
            }
        })
    } catch (error){
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

async function updateUserProfile(req, res){
    const userId = req.user._id;
    const updates = req.body;

    if (!updates) {
        return res.status(400).json({
            error: true,
            message: "No data provided"
        })
    }

    if (updates.email){
        const email = updates.email;
        const isPresent = await User.findOne({email});
        if (isPresent) {
            return res.status(400).json({
                error: true,
                message: 'Email already exists',
            })
        }
    }

    try {
        // Find the user and update with only the fields provided in the request body
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true, // Return the updated document
            runValidators: true, // Run validation on the updated fields
            select: '-password -urls' // exclude the password and urls no need as of now
        });

        if (!updatedUser){
            return res.status(404).json({
                error: true,
                message: "User already exist"
            })
        }
        // respond with the updated data

        return res.status(200).json({
            error: false,
            data: updatedUser
        })
    } catch (error) {
        console.log("Error updating profile", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        })

    }
}

async function generateApiKey(req, res) {
    const userId = req.user._id;

    // Check if the user exists
    const isUser = await User.findById(userId);
    if (!isUser) {
        return res.status(404).json({
            error: true,
            message: 'User not found',
        });
    }

    try {
        // Generate a new API key
        const apiKey = UUIDv4();

        // Create a new API key document
        const newApiKey = new ApiKey({
            user: userId,
            key: apiKey,
            expiresAt: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000), // 360 days from now
        });

        // Save the new API key document
        await newApiKey.save();

        // Update the user's API key field
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { apiKey: apiKey } },
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({
                error: true,
                message: 'Error occurred during API key generation',
            });
        }

        return res.status(200).json({
            error: false,
            data: {
                apiKey: updatedUser.apiKey,
                expiresAt: newApiKey.expiresAt,
            },
        });
    } catch (error) {
        console.log('Error generating API key', error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

async function regenerateApiKey(req, res) {
    const userId = req.user._id;

    // Check if the user exists
    const isUser = await User.findById(userId);
    if (!isUser) {
        return res.status(404).json({
            error: true,
            message: 'User not found',
        });
    }

    try {
        // Generate a new API key
        const newApiKey = UUIDv4();

        // Find the user's API key record and update it
        const updatedApiKey = await ApiKey.findOneAndUpdate(
            { user: userId },
            { $set: { key: newApiKey, expiresAt: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000) } },
            { new: true }
        );

        if (!updatedApiKey) {
            return res.status(404).json({
                error: true,
                message: 'API key not found',
            });
        }

        // Update the user's API key reference
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { apiKey: newApiKey } },
            { new: true }
        );

        return res.status(200).json({
            error: false,
            data: {
                apiKey: updatedApiKey.key,
                expiresAt: updatedApiKey.expiresAt,
            },
        });
    } catch (error) {
        console.log('Error regenerating API key', error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}


module.exports = {
    handleSignup,
    handleLogin,
    getUserProfile,
    updateUserProfile,
    generateApiKey,
    regenerateApiKey
};
