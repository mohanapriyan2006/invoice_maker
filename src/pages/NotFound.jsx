import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundI from '../assets/not-found.jpg'

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="text-center max-w-md">
                <div className="-mt-40">
                    <img
                        src={notFoundI}
                        alt="Not Found Illustration"
                        className="w-full max-w-xs mx-auto"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mb-6">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="btn-1 px-6 py-2 rounded-lg hover:bg-blue-800 "
                >
                    Go to Home
                </button>

            </div>
        </div>
    );
};

export default NotFound;
