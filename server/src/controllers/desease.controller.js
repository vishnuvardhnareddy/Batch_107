// controllers/disease.controller.js
import Disease from '../models/desease.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import diseaseSchema from '../validate/desease.validate.js';

// Create a new disease record with user details
const createDisease = async (req, res, next) => {
    const { name, symptoms, tablets, description, userAge, userGender } = req.body;

    // Validate the request data against the schema
    const { error } = diseaseSchema.validate(req.body);
    if (error) {
        return next(new ApiError(400, error.details[0].message));
    }

    try {
        const disease = new Disease({ name, symptoms, tablets, description, userAge, userGender });
        await disease.save();

        res.status(201).json(new ApiResponse(201, disease, 'Disease created successfully'));
    } catch (err) {
        next(new ApiError(500, 'Error creating disease record', [err.message]));
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
        res.status(200).json(new ApiResponse(200, diseases, 'Diseases retrieved successfully'));
    } catch (err) {
        next(new ApiError(500, 'Error retrieving disease records', [err.message]));
    }
};

// Get specific disease by name
const getDiseaseByName = async (req, res, next) => {
    const { name } = req.params; // Assuming name is passed as a route parameter

    try {
        const disease = await Disease.findOne({ name });

        if (!disease) {
            return next(new ApiError(404, 'Disease not found'));
        }

        res.status(200).json(new ApiResponse(200, disease, 'Disease retrieved successfully'));
    } catch (err) {
        next(new ApiError(500, 'Error retrieving disease record', [err.message]));
    }
};

// Get disease info based on user age, gender, and disease name (private endpoint)
const getDiseaseInfoByUserDetails = async (req, res, next) => {
    const { age, gender, name } = req.body; // Assuming these are passed in the request body

    try {
        // Check if disease exists
        const disease = await Disease.findOne({ name });

        if (!disease) {
            return next(new ApiError(404, 'Disease not found'));
        }

        // Prepare response with relevant disease information
        const { tablets, description } = disease;
        res.status(200).json(new ApiResponse(200, { tablets, description }, 'Disease information retrieved successfully'));
    } catch (err) {
        next(new ApiError(500, 'Error retrieving disease information', [err.message]));
    }
};

export { createDisease, getAllDiseases, getDiseaseByName, getDiseaseInfoByUserDetails };
