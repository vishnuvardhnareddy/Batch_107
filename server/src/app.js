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
import fs from 'fs';
import https from 'https';
import http from 'http';

dotenv.config();

const app = express();

// CORS Middleware (apply only once)
app.use(cors({
    origin: 'http://localhost:5173',  // Allow the specific frontend URL (e.g., React app)
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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoStore error logging
store.on("error", (error) => {
    console.error('MongoStore error:', error);
});

// Session middleware (must be after CORS)
app.use(session({
    store,
    secret: process.env.SESSION_SECRET || 'secret',  // Use a secure secret for production
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,  // Prevent JavaScript from accessing cookies
        secure: process.env.NODE_ENV === 'production',  // `true` for HTTPS in production
        maxAge: 1000 * 60 * 60 * 24,  // 1-day expiration for session cookie
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

// Create the HTTPS server
const httpsOptions = {
    key: fs.readFileSync('path/to/your/private-key.pem'),   // Replace with your private key path
    cert: fs.readFileSync('path/to/your/certificate.pem'),  // Replace with your certificate path
    ca: fs.readFileSync('path/to/your/ca.pem'),            // Replace with your CA certificate path (if applicable)
};

// HTTPS server setup
const httpsServer = https.createServer(httpsOptions, app);

// Fallback to HTTP server if HTTPS is not available
const httpServer = http.createServer(app);

// Connect to MongoDB and start servers
const PORT = process.env.PORT || 3000;
const HTTP_PORT = 3001; // Set a different port for HTTP

const connectDb = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        // Ensure the MONGO_URI variable is properly defined
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }

        // Connect to MongoDB
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB Atlas');

        // Start the HTTP server for fallback (non-HTTPS requests)
        httpServer.listen(HTTP_PORT, () => {
            console.log(`HTTP server is running on port ${HTTP_PORT}`);
        });

        // Start the HTTPS server for secure requests
        httpsServer.listen(PORT, () => {
            console.log(`HTTPS server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
};

connectDb();
