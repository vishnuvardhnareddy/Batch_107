// models/Disease.js
import mongoose from 'mongoose';

const diseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    symptoms: {
        type: [String],
        required: true
    },
    tablets: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Disease = mongoose.model('Disease', diseaseSchema);

export default Disease;
