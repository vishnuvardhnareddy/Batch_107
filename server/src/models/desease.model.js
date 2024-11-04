// models/Disease.js

import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ageGroup: { type: String, required: true },  // e.g., "20-30", "30-40"
    precautions: { type: String, required: true },
    recommendedTablets: { type: [String], required: true },  // Array of tablet names
});

const Disease = mongoose.model('Disease', diseaseSchema);

export default Disease;
