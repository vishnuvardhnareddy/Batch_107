import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetDiseaseData = () => {
    const [symptoms, setSymptoms] = useState(''); // Updated input field for symptoms
    const [ageGroup, setAgeGroup] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for user feedback
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Start loading

        // Validate input fields
        if (!symptoms || !ageGroup) {
            setError('Both fields are required.');
            setLoading(false);
            return;
        }

        try {
            const URI = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${URI}/disease/getData`, {
                params: { symptoms, ageGroup },
                withCredentials: true
            });

            if (response.data) {
                const diseaseDetails = response.data;

                navigate('/displayDisease', { state: { diseaseDetails } });
            } else {
                setError('No data available for the specified symptoms and age group.');
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Disease details not found.');
            } else {
                setError('Failed to fetch disease details. Please try again.');
            }
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="app-background mx-auto p-6 mt-16 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-white">Get Disease Details</h1>
            {error && <p className="text-red-400">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-300">Symptoms</label>
                    <input
                        type="text"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="border border-gray-600 bg-gray-700 bg-opacity-70 rounded-lg w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter symptoms, separated by commas"
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
                        placeholder="Enter age group"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? 'Loading...' : 'Get Disease Details'}
                </button>
            </form>
        </div>
    );
};

export default GetDiseaseData;
