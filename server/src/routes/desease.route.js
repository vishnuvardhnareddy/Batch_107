// routes/disease.route.js
import express from 'express';
import { createDisease, getAllDiseases, getDiseaseByName, getDiseaseInfoByUserDetails } from '../controllers/desease.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js'; // Import the authentication middleware

const router = express.Router();

// Route to create a new disease record
router.post('/', isAuthenticated, createDisease); // Protected route

// Route to get all disease records
router.get('/', isAuthenticated, getAllDiseases); // Protected route

// Route to get a specific disease by name
router.get('/:name', isAuthenticated, getDiseaseByName); // Protected route

// Private route to get disease info based on user age, gender, and disease name
router.post('/info', isAuthenticated, getDiseaseInfoByUserDetails); // Protected route

export default router;
