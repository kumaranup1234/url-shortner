import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../utils/constants.js";

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
        <div className="px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="text-center p-4 mt-4">
                <h1 className="text-2xl md:text-3xl text-gray-700 font-bold">Your shortened URL</h1>
                <p className="mt-3 text-sm md:text-base">
                    Copy the short link and share it in messages, texts, posts, websites, and other locations.
                </p>
            </div>

            <div className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white max-w-xl mx-auto mt-6">
                <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                    <form className="border-2 flex items-center w-full md:w-auto">
                        <input
                            type="text"
                            name="url"
                            placeholder="Enter the link here"
                            value={shortenedUrl}
                            readOnly
                            className="border-none focus:ring-2 focus:ring-blue-500 flex-grow h-12 md:h-14 px-4 text-sm md:text-base outline-none rounded-l-md"
                        />
                        <button
                            className={`font-bold px-4 py-3 md:px-6 md:py-3 transition duration-200 ${buttonText === "Copied!" ? "bg-green-600 hover:bg-green-800 text-white" : "bg-blue-600 hover:bg-blue-800 text-white"}`}
                            onClick={handleCopyClick}
                        >
                            {buttonText}
                        </button>
                    </form>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                        <p className="text-sm md:text-base font-medium">Long URL:</p>
                        <a
                            target="_blank"
                            href={link}
                            rel="noopener noreferrer"
                            className="text-blue-700 cursor-pointer break-all whitespace-normal overflow-wrap max-w-full border-2 border-gray-300 p-2 bg-gray-100 rounded-lg text-sm md:text-base"
                            title={link}
                        >
                            {link}
                        </a>
                    </div>
                    <button
                        className="w-full md:w-auto mt-6 bg-blue-600 text-white font-bold px-6 py-2 md:py-3 hover:bg-blue-800 transition duration-200 rounded"
                        onClick={handleClick}
                    >
                        Shorten another URL
                    </button>
                    <p className="mt-4 text-xs text-gray-500">
                        * Short URLs that do not have at least one click per month are disabled
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Shortened;
