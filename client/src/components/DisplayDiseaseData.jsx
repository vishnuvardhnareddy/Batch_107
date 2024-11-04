import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DisplayDiseaseData = () => {
    const location = useLocation();
    const { diseaseDetails } = location.state || {};
    const navigate = useNavigate(); // Hook to navigate back
    console.log('Received Disease Details:', diseaseDetails);

    if (!diseaseDetails) {
        return (
            <div className="app-background mx-auto p-4 mt-16 bg-gray-800 rounded-lg shadow-md">
                <p className="text-white">No data available</p>
            </div>
        );
    }

    return (
        <div className="app-background mx-auto p-6 mt-16 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg max-w-2xl">
            <h1 className="text-2xl font-bold mb-4 text-white">Disease Details</h1>
            <div className="mb-4 p-4 border-l-4 border-blue-500 bg-blue-700 bg-opacity-60 rounded-lg">
                <h2 className="text-xl font-semibold text-white">General Information</h2>
                <p><strong className="text-gray-300">Name:</strong> <span className="text-gray-200">{diseaseDetails.name}</span></p>
                <p><strong className="text-gray-300">Age Group:</strong> <span className="text-gray-200">{diseaseDetails.ageGroup}</span></p>
            </div>
            <div className="mb-4 p-4 border-l-4 border-green-500 bg-green-700 bg-opacity-60 rounded-lg">
                <h2 className="text-xl font-semibold text-white">Precautions</h2>
                <p className="text-gray-200">{diseaseDetails.precautions}</p>
            </div>
            <div className="mb-4 p-4 border-l-4 border-orange-500 bg-orange-700 bg-opacity-60 rounded-lg">
                <h2 className="text-xl font-semibold text-white">Recommended Tablets</h2>
                <p className="text-gray-200">{diseaseDetails.recommendedTablets.join(', ')}</p>
            </div>
            <button
                onClick={() => navigate(-1)} // Go back to the previous page
                className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
                Go Back
            </button>
        </div>
    );
};

export default DisplayDiseaseData;
