// models/user.model.js
import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true,
        minlength: 3, // Minimum length of 3 characters
        maxlength: 30, // Maximum length of 30 characters
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length of 6 characters
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
