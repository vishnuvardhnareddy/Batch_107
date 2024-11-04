import { useUser } from '../context/UserContext'; // Adjust the path as needed
// import image from "../assets/banner.jpg"; // Import the image directly
const Home = () => {
    const { user } = useUser();

    return (
        <div
            className="app-background flex items-center justify-center min-h-screen" // Use the imported image
        >
            <div className="bg-black bg-opacity-50 p-8 rounded-lg text-white max-w-md mx-auto">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome, {user?.username || 'Guest'}!
                </h1>
                <p className="text-lg">
                    This is the home page. Enjoy your stay and explore more.
                </p>
            </div>
        </div>
    );
};

export default Home;
