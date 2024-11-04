// controllers/diseaseController.js
import Disease from "../models/desease.model.js";

// Add a new disease
const addDisease = async (req, res) => {
    try {
        const { name, ageGroup, symptoms, precautions, recommendedTablets, description } = req.body;

        const newDisease = new Disease({
            name,
            ageGroup,
            symptoms,
            precautions,
            recommendedTablets,
            description
        });
        await newDisease.save();
        res.status(201).json({ message: "Disease details added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while adding disease details." });
    }
};

// Get disease details based on symptoms and age group
const getDiseaseDetails = async (req, res) => {
    try {
        const { symptoms, ageGroup } = req.query;
        const symptomsArray = symptoms.split(',').map(symptom => symptom.trim().toLowerCase());

        // First, attempt to find an exact match (all symptoms and age group)
        let disease = await Disease.findOne({
            symptoms: { $all: symptomsArray },
            ageGroup
        });

        // If no exact match is found, use aggregation to find the best match
        if (!disease) {
            const pipeline = [
                {
                    $match: {
                        ageGroup,  // Filter by age group
                        symptoms: { $in: symptomsArray }  // Match at least one symptom
                    }
                },
                {
                    $addFields: {
                        matchingSymptomsCount: {
                            $size: { $setIntersection: ["$symptoms", symptomsArray] }  // Count matching symptoms
                        }
                    }
                },
                { $sort: { matchingSymptomsCount: -1 } }, // Sort by highest matching symptoms
                { $limit: 1 }  // Get the top match
            ];

            const result = await Disease.aggregate(pipeline);
            disease = result[0] || null; // Get the first match or set to null if no match is found
        }

        if (disease) {
            res.status(200).json(disease);
        } else {
            res.status(404).json({ message: "No similar disease found." });
        }
    } catch (error) {
        console.error('Error fetching disease details:', error);
        res.status(500).json({ error: "An error occurred while fetching disease details." });
    }
};


export { getDiseaseDetails, addDisease };
