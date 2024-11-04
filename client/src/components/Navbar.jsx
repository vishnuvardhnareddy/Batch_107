import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const { user, logoutUser } = useUser();

    return (
        <nav className="bg-gray-800 text-white flex justify-between items-center p-4 fixed top-0 w-full z-10">
            {/* Left Side: Brand/Logo or Links */}
            <div className="flex items-center space-x-4">
                <Link to="/home" className="text-xl font-bold hover:text-gray-400">Home</Link>
                <Link to="/about" className="hover:text-gray-400">About</Link>
                <Link to="/postdata" className="hover:text-gray-400">NewDisease</Link>
                <Link to="/getdata" className="hover:text-gray-400">findDisease</Link>
            </div>

            {/* Right Side: User Actions */}
            <div className="flex items-center space-x-4">
                {user ? (
                    <>

                        <button
                            onClick={logoutUser}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-gray-400">Login</Link>
                        <Link to="/signin" className="hover:text-gray-400">Sign In</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
