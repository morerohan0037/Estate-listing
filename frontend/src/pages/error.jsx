import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-lg mb-6">Oops! The page you’re looking for doesn’t exist.</p>
            <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
