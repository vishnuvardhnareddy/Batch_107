import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDisease = () => {
    const [name, setName] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [precautions, setPrecautions] = useState('');
    const [recommendedTablets, setRecommendedTablets] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !ageGroup || !symptoms || !precautions || !recommendedTablets || !description) {
            setError('All fields are required.');
            return;
        }

        try {
            const URI = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${URI}/disease/postData`, {
                name,
                ageGroup,
                symptoms: symptoms.split(',').map(symptom => symptom.trim()), // Convert symptoms to array
                precautions,
                recommendedTablets: recommendedTablets.split(',').map(tablet => tablet.trim()), // Convert tablets to array
                description
            }, { withCredentials: true });

            if (response.status === 201) {
                console.log(response);
                navigate('/home');
            }
        } catch (err) {
            setError('Failed to add disease. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="app-background p-6 mt-16 bg-gray-800 bg-opacity-90 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-white">Add Disease</h1>
            {error && <p className="text-red-400">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-300">Disease Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-600 rounded-lg w-full p-2 bg-gray-700 bg-opacity-80 text-white placeholder-gray-400"
                        placeholder="Enter disease name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-300">Age Group</label>
                    <input
                        type="text"
                        value={ageGroup}
                        onChange={(e) => setAgeGroup(e.target.value)}
                        className="border border-gray-600 rounded-lg w-full p-2 bg-gray-700 bg-opacity-80 text-white placeholder-gray-400"
                        placeholder="Enter age group"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-300">Symptoms</label>
                    <input
                        type="text"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="border border-gray-600 rounded-lg w-full p-2 bg-gray-700 bg-opacity-80 text-white placeholder-gray-400"
                        placeholder="Enter symptoms (comma separated)"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-300">Precautions</label>
                    <textarea
                        value={precautions}
                        onChange={(e) => setPrecautions(e.target.value)}
                        className="border border-gray-600 rounded-lg w-full p-2 bg-gray-700 bg-opacity-80 text-white placeholder-gray-400"
                        rows="4"
                        placeholder="Enter precautions"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-300">Recommended Tablets</label>
                    <input
                        type="text"
                        value={recommendedTablets}
                        onChange={(e) => setRecommendedTablets(e.target.value)}
                        className="border border-gray-600 rounded-lg w-full p-2 bg-gray-700 bg-opacity-80 text-white placeholder-gray-400"
                        placeholder="Enter recommended tablets (comma separated)"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-600 rounded-lg w-full p-2 bg-gray-700 bg-opacity-80 text-white placeholder-gray-400"
                        rows="4"
                        placeholder="Enter a brief description of the disease"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Add Disease
                </button>
            </form>
        </div>
    );
};

export default AddDisease;
