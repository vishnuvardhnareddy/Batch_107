import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import User from './models/user.model.js';
import dotenv from 'dotenv';
import MongoStore from "connect-mongo";
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration: Allow requests from any origin
app.use(cors({
    origin: '*', // Allow requests from any origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // 'mongoUrl' instead of 'mongoURI'
    crypto: {
        secret: process.env.SESSION_SECRET || 'secret',
    },
    touchAfter: 24 * 3600, // 1 day in seconds
});

app.use(session({
    store: store,
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true, // Change to true for production with HTTPS
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

// Passport.js initialization
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

// Routes
import deseaseRoutes from "./routes/desease.route.js";
app.use("/api/v1/disease", deseaseRoutes);

import userRoutes from './routes/user.route.js';
app.use('/api/v1/user', userRoutes);

// Test route
app.get('/', (req, res) => res.send('Hello, world!'));


const PORT = process.env.PORT || 3000;
const connectDb = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        // Ensure the MONGO_URI variable is properly defined
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }

        // Connect to MongoDB
        await mongoose.connect(`${mongoUri}`);
        console.log('Connected to MongoDB Atlas');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

connectDb();
