import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import User from './models/user.model.js'; // Assuming your User model is in 'models/user.model.js'
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// CORS Middleware (only for development)
app.use(cors({
    origin: 'http://localhost:5173',  // Allow your frontend's URL (e.g., React app)
    credentials: true,  // Allow cookies and credentials to be sent
}));

// MongoDB session store setup
const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 60 * 60,  // Ensure the session is not prematurely destroyed
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoStore error handling
store.on('error', (error) => {
    console.error('MongoStore error:', error);
});

// Session middleware (after CORS setup)
app.use(session({
    store,
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,  // Prevent JavaScript from accessing cookies
        secure: process.env.NODE_ENV === 'production',  // Only secure in production (nginx handles HTTPS)
        maxAge: 1000 * 60 * 60 * 24,  // 1-day expiration for session cookie
    },
}));

// Passport.js setup
app.use(passport.initialize());
app.use(passport.session());

// Passport Local strategy
passport.use(new LocalStrategy.Strategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Passport serialization and deserialization
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Routes with '/medassist/api/v1' prefix
import deseaseRoutes from './routes/desease.route.js';
app.use('/medassist/api/v1/disease', deseaseRoutes);

import userRoutes from './routes/user.route.js';
app.use('/medassist/api/v1/user', userRoutes);

// Test route to check if the server is running


// Connect to MongoDB and start the server
const connectDb = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in the environment variables.');
        }

        // Connect to MongoDB
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

connectDb();

export default app;
