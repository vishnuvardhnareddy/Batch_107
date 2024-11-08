import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DisplayDiseaseData = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Safely destructuring with a fallback
    const { diseaseDetails } = location.state || {};

    // Log the state to see if it is correctly received
    console.log('Received Disease Details:', diseaseDetails);

    // Handling undefined diseaseDetails
    if (!diseaseDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-white">No disease data available. Please go back and try again.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 mt-16 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-white">Disease Details</h1>
            <div className="mb-4 p-4 bg-blue-700 bg-opacity-80 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-white">General Information</h2>
                <p className="text-gray-200 mt-2"><strong>Name:</strong> {diseaseDetails.name}</p>
                <p className="text-gray-200"><strong>Age Group:</strong> {diseaseDetails.ageGroup}</p>
                <p className="text-gray-200"><strong>Description:</strong> {diseaseDetails.description}</p>
            </div>
            {/* Other sections... */}
            <button
                onClick={() => navigate(-1)}
                className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
                Go Back
            </button>
        </div>
    );
};

export default DisplayDiseaseData;
