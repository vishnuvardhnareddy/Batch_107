import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetDiseaseData = () => {
    const [name, setName] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !ageGroup) {
            setError('Both fields are required.');
            return;
        }

        try {
            const URI = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${URI}/disease/getData`, {
                params: { name, ageGroup },
                withCredentials: true
            });

            if (response.data) {
                console.log(response.data); // Check what you are getting from the API
                const diseaseDetails = response.data; // Ensure this contains the correct structure
                console.log('Disease Details:', diseaseDetails); // Log the disease details
                navigate('/displayDisease', { state: { diseaseDetails } });
            }

        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Disease details not found.');
            } else {
                setError('Failed to fetch disease details. Please try again.');
            }
            console.error(err);
        }
    };

    return (
        <div className="app-background mx-auto p-6 mt-16 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg ">
            <h1 className="text-2xl font-bold mb-4 text-white">Get Disease Details</h1>
            {error && <p className="text-red-400">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-300">Disease Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-600 bg-gray-700 bg-opacity-70 rounded-lg w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-300">Age Group</label>
                    <input
                        type="text"
                        value={ageGroup}
                        onChange={(e) => setAgeGroup(e.target.value)}
                        className="border border-gray-600 bg-gray-700 bg-opacity-70 rounded-lg w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Get Disease Details
                </button>
            </form>
        </div>
    );
};

export default GetDiseaseData;
