// controllers/user.controller.js
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // If authenticated, proceed to the next middleware/controller
    }
    return next(ApiError.unauthorized('You must be logged in to access this resource.'));
};

// Register user
const registerUser = async (req, res, next) => {
    try {
        // Implement your registration logic here
        const { username, password } = req.body;
        // Assuming User is a model you’ve defined elsewhere to manage user data
        const user = await User.create({ username, password });

        res.status(201).json(ApiResponse.success('User registered successfully', {
            user,
            message: 'Registration completed. You can now log in.',
        }));
    } catch (error) {
        return next(ApiError.internal('An error occurred during registration.'));
    }
};

// Login user
const loginUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(200).json(ApiResponse.success('Logged in successfully', {
            user: req.user,
            message: 'Welcome back!',
        }));
    }
    return next(ApiError.unauthorized('User authentication failed. Please check your credentials.'));
};

// Logout user
const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(ApiError.internal('An error occurred while logging out. Please try again.'));
        }
        res.status(200).json(ApiResponse.success('Logged out successfully', {
            message: 'You have been successfully logged out. Come back soon!',
        }));
    });
};

// Fetch user details
const getUserDetails = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(ApiError.unauthorized('User is not logged in.'));
    }
    res.status(200).json(ApiResponse.success('User details retrieved successfully', {
        user: req.user,
        message: 'Here are your profile details.',
    }));
};

export { registerUser, loginUser, logoutUser, getUserDetails, isLoggedIn };
