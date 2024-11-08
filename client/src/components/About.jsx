const About = () => (
    <div className="flex flex-col items-center justify-start pt-20 min-h-screen bg-gray-800">
        {/* Main Content Container */}
        <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-full text-center text-white mx-4">
            <h1 className="text-4xl font-bold mb-4">About Our Application</h1>

            {/* Introduction Section */}
            <section className="mb-8">
                <p className="text-lg mb-4">
                    Welcome to our web application! This platform assists users in identifying diseases based on symptoms they input. We provide the disease name along with detailed information, making it easier for users to understand potential health concerns.
                </p>
            </section>

            {/* Features Section */}
            <section className="mb-8">
                <h2 className="text-3xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-2">Symptom Checker</h3>
                        <p>
                            Enter your symptoms, and our tool will analyze them to suggest possible diseases and conditions.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-2">Disease Information</h3>
                        <p>
                            Access comprehensive information about each identified disease, including symptoms, causes, and treatment options.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-2">Data Tables</h3>
                        <p>
                            View symptoms and diseases in organized tables for a quick and easy reference.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-2">User-Friendly Interface</h3>
                        <p>
                            Navigate easily with an intuitive design that guides you step-by-step through the process.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="mt-8">
                <h2 className="text-3xl font-semibold mb-4">Get Started</h2>
                <p className="mb-6">
                    Begin by entering your symptoms, and let our application guide you to possible conditions. Stay informed and take control of your health!
                </p>
                <button
                    className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition duration-200"
                    onClick={() => window.history.back()}
                >
                    Go Back
                </button>
            </section>
        </div>
    </div>
);

export default About;
