const About = () => (
    <div className="app-background flex items-center justify-center min-h-screen">
        <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg max-w-lg text-center text-white">
            <h1 className="text-4xl font-bold mb-4">About Page</h1>
            <p className="text-lg mb-6">
                This is a protected page for logged-in users only. Here, you can find information about the application, its features, and how to use it effectively.
            </p>
            <button
                className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                onClick={() => window.history.back()} // Button to go back
            >
                Go Back
            </button>
        </div>
    </div>
);

export default About;
