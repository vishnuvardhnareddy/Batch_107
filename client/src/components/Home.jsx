import { useUser } from '../context/UserContext'; // Adjust the path as needed
// import image from "../assets/banner.jpg"; // Uncomment and adjust if using an image background
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user } = useUser();
    const navigate = useNavigate(); // Renamed to 'navigate' for clarity

    return (
        <div className="app-background flex items-center justify-center min-h-screen bg-gray-800">
            <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg max-w-lg text-center text-white">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome, {user?.username || 'Guest'}!
                </h1>
                <p className="text-lg mb-6">
                    This is the home page. Enjoy your stay and explore more about what our application offers.
                </p>
                <button
                    className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                    onClick={() => navigate("/getdata")} // Updated path to use a leading "/"
                >
                    Explore More
                </button>
            </div>
        </div>
    );
};

export default Home;
