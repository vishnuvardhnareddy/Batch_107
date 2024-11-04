// models/disease.model.js
import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ageGroup: { type: String, required: true },  // e.g., "20-30", "30-40"
    symptoms: { type: [String], required: true },  // Array of symptoms
    precautions: { type: String, required: true },
    recommendedTablets: { type: [String], required: true },  // Array of tablet names
    description: { type: String, required: true }  // Short description of the disease
});

const Disease = mongoose.model('Disease', diseaseSchema);

export default Disease;
