// controllers/diseaseController.js
import Disease from "../models/desease.model.js";

// Add a new disease
const addDisease = async (req, res) => {
    try {
        const { name, ageGroup, precautions, recommendedTablets } = req.body;

        const newDisease = new Disease({
            name,
            ageGroup,
            precautions,
            recommendedTablets
        });
        await newDisease.save();
        res.status(201).json({ message: "Disease details added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while adding disease details." });
    }
};

// Get disease details based on age and disease name
const getDiseaseDetails = async (req, res) => {
    try {
        const { name, ageGroup } = req.query;

        const disease = await Disease.findOne({ name, ageGroup });
        if (disease) {
            res.status(200).json(disease);
        } else {
            res.status(404).json({ message: "Disease details not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching disease details." });
    }
};

export { getDiseaseDetails, addDisease }