import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Health Portal</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/signin" className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200">
                Login
              </Link>
            </li>
            <li>
              <Link to="/userprofile" className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200">
                Search
              </Link>
            </li>
            <li>
              <Link to="/disease" className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200">
                Disease Info
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
