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
        <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-95"> {/* Full-screen flexbox */}
            <div className=" p-8 w-full max-w-lg rounded-lg shadow-lg"> {/* Max-width for form */}
                <h1 className="text-4xl font-bold mb-6 text-white text-center">Get Disease Details</h1>
                {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-1 text-gray-300">Symptoms</label>
                        <input
                            type="text"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            className="border border-gray-600 bg-gray-800 rounded-lg w-full p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter symptoms, separated by commas"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-1 text-gray-300">Age Group</label>
                        <input
                            type="text"
                            value={ageGroup}
                            onChange={(e) => setAgeGroup(e.target.value)}
                            className="border border-gray-600 bg-gray-800 rounded-lg w-full p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter age group"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition duration-200"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Loading...' : 'Get Disease Details'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GetDiseaseData;
