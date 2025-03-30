import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import mainlogo from "../assets/icons/mainlogo.svg";

const Navbar = () => {
    const { user, logout } = useAuth(); // Get user from global context
    // Check if user is logged in and has a token
    

    return (
        <nav className="bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
                
                {/* Logo Section */}
                <Link to="/" className="flex items-center mb-4 md:mb-0">
                    <img src={mainlogo} alt="Logo" className="h-10 mr-2" />
                    <h1 className="text-2xl font-semibold">EarthlyStays</h1>
                </Link>

                {/* Navigation Links */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-lg font-medium">
                    <Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link>
                    <Link to="/listings" className="hover:text-gray-300 transition duration-300">All Listings</Link>

                    {user && (
                        <Link to="/add-listing" className="hover:text-gray-300 transition duration-300">
                            Add Listing
                        </Link>
                    )}

                    {/* Auth Buttons - Always aligned properly */}
                    <div className="flex gap-3">
                        {user ? (
                            <button
                                onClick={logout}
                                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                    Login
                                </Link>
                                <Link to="/signup" className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition">
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
