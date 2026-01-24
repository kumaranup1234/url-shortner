import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCopy, FaCheck } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Confetti from "react-confetti";
import MainFooter from "../shared/components/MainFooter.jsx";
import { BASE_URL } from "../shared/utils/constants";

const Shortened = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { link, shortId } = location.state || {};
    const shortenedUrl = `${BASE_URL}/${shortId}`;
    const [buttonText, setButtonText] = useState("Copy URL");

    const handleCopyClick = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(shortenedUrl)
            .then(() => {
                setButtonText("Copied!");
                setTimeout(() => {
                    setButtonText("Copy URL");
                }, 3000);
            })
            .catch((err) => {
                console.error("Failed to copy URL:", err);
            });
    };

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl space-y-8">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <FaCheck className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Your URL has been shortened!</h2>
                        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
                            Copy your new link and share it anywhere. It's ready to track clicks.
                        </p>
                    </div>

                    <div className="bg-white py-8 px-8 shadow-xl rounded-2xl border border-gray-100">
                        <div className="space-y-6">
                            {/* Shortened URL Input Group */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Shortened Link</label>
                                <div className="flex rounded-xl shadow-sm">
                                    <input
                                        type="text"
                                        readOnly
                                        value={shortenedUrl}
                                        className="flex-1 min-w-0 block w-full px-4 py-4 rounded-l-xl border-gray-300 bg-gray-50 text-blue-600 text-lg font-medium focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleCopyClick}
                                        className={`inline-flex items-center px-6 py-4 border border-transparent text-base font-bold rounded-r-xl text-white transition-all duration-200 ${buttonText === "Copied!"
                                            ? "bg-green-600 hover:bg-green-700"
                                            : "bg-blue-600 hover:bg-blue-700"
                                            }`}
                                    >
                                        <FaCopy className="-ml-1 mr-2 h-5 w-5" />
                                        {buttonText}
                                    </button>
                                </div>
                            </div>

                            {/* Long URL Display */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Original Destination
                                </p>
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-900 break-all hover:text-blue-600 hover:underline transition-colors"
                                >
                                    {link}
                                </a>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={handleClick}
                                    className="flex-1 bg-white text-gray-700 font-bold py-3 px-6 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
                                >
                                    Shorten Another
                                </button>
                                <button
                                    onClick={() => navigate('/links')}
                                    className="flex-1 bg-gray-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-black transition-colors shadow-lg"
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        * Inactive links may be removed after 30 days of standard inactivity.
                    </p>
                </div>
            </div>
            <MainFooter />
        </div>
    );
};

export default Shortened;
