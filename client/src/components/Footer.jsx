// Footer.js
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center p-4 fixed bottom-0 w-full shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} Your App Name. All rights reserved.
                </p>
                <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-200">
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-200">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-200">
                        <FaInstagram />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-200">
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
