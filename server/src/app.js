// app.js
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import User from './models/user.model.js';
import dotenv from 'dotenv';

// Load environment variables from a custom file
dotenv.config();


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
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

// Import and use user routes
app.get("/", (_, res) => {
    res.send("server connected")
})

import userRoutes from './routes/user.route.js';
app.use('/api/v1/user', userRoutes);

import diseaseRoutes from './routes/desease.route.js';
app.use('/api/v1/disease', diseaseRoutes);

// Test route
app.get('/', (req, res) => res.send('Hello, world!'));

export default app;
