import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            {/* Fixed Navbar */}


            {/* Main Content */}
            <main className="flex-grow mt-16 p-6 flex items-center justify-center">
                <div className="max-w-lg p-10 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-center text-white w-full">
                    <h1 className="text-3xl font-bold mb-4">
                        Welcome, {user?.username || 'Guest'}!
                    </h1>
                    <p className="text-lg mb-6">
                        Find potential diseases based on your symptoms and age. Explore more to get insights and helpful information.
                    </p>
                    <button
                        className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                        onClick={() => navigate("/getdata")}
                    >
                        Get Started
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Home;
