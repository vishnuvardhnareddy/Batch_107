// controllers/disease.controller.js
import Disease from '../models/desease.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import diseaseSchema from '../validate/desease.validate.js';

// Create a new disease record with user details
const createDisease = async (req, res, next) => {
    const { name, symptoms, tablets, description, userAge, userGender } = req.body;

    // Validate the request data against the schema
    const { error } = diseaseSchema.validate(req.body);
    if (error) {
        return next(ApiError.badRequest(error.details[0].message));
    }

    try {
        const disease = new Disease({ name, symptoms, tablets, description, userAge, userGender });
        await disease.save();

        res.status(201).json(ApiResponse.success('Disease created successfully', disease));
    } catch (err) {
        next(ApiError.internal('Error creating disease record', err));
    }
};

// Get all disease records based on user age and gender
const getAllDiseases = async (req, res, next) => {
    const { age, gender } = req.query; // Assuming age and gender are passed as query parameters

    try {
        let query = {};

        // Filtering by user age and gender if provided
        if (age) {
            query.userAge = age;
        }
        if (gender) {
            query.userGender = gender;
        }

        const diseases = await Disease.find(query);
        res.status(200).json(ApiResponse.success('Diseases retrieved successfully', diseases));
    } catch (err) {
        next(ApiError.internal('Error retrieving disease records', err));
    }
};

// Get specific disease by name
const getDiseaseByName = async (req, res, next) => {
    const { name } = req.params; // Assuming name is passed as a route parameter

    try {
        const disease = await Disease.findOne({ name });

        if (!disease) {
            return next(ApiError.notFound('Disease not found'));
        }

        res.status(200).json(ApiResponse.success('Disease retrieved successfully', disease));
    } catch (err) {
        next(ApiError.internal('Error retrieving disease record', err));
    }
};

// Get disease info based on user age, gender, and disease name (private endpoint)
const getDiseaseInfoByUserDetails = async (req, res, next) => {
    const { age, gender, name } = req.body; // Assuming these are passed in the request body

    try {
        // Check if disease exists
        const disease = await Disease.findOne({ name });

        if (!disease) {
            return next(ApiError.notFound('Disease not found'));
        }

        // Prepare response with relevant disease information
        const { tablets, description } = disease;
        res.status(200).json(ApiResponse.success('Disease information retrieved successfully', { tablets, description }));
    } catch (err) {
        next(ApiError.internal('Error retrieving disease information', err));
    }
};

export { createDisease, getAllDiseases, getDiseaseByName, getDiseaseInfoByUserDetails };
