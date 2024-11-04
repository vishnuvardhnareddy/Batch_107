// routes/disease.route.js
import express from 'express';
import { getDiseaseDetails, addDisease } from '../controllers/desease.controller.js';
import isLoggedIn from "../middlewares/isLoggedIn.js"// Import the authentication middleware

const router = express.Router();

// Route to create a new disease record
router.post('/postData', isLoggedIn, addDisease); // Protected route

// Route to get all disease records
router.get('/getData', isLoggedIn, getDiseaseDetails); // Protected route
export default router;
