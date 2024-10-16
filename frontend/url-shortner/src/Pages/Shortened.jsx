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

        // Use the Clipboard API to copy the URL
        navigator.clipboard.writeText(shortenedUrl)
            .then(() => {
                setButtonText("Copied!");
                // Automatically hide the copied message after 3 seconds
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
        <div>
            <div className="text-center p-4 mt-2">
                <h1 className="text-3xl text-gray-700 font-bold mr-80">Your shortened URL</h1>
                <p className="mt-3 ml-2">
                    Copy the short link and share it in messages, texts, posts, websites and other
                    locations.
                </p>
            </div>
            <div className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white max-w-2xl ml-96 mt-10 mb-10">
                <div className="flex justify-center mt-10">
                    <form className="border-2 flex items-center w-full">
                        <input
                            type="text"
                            name="url"
                            placeholder="Enter the link here"
                            value={shortenedUrl}
                            readOnly
                            className="border-none focus:ring-2 focus:ring-blue-500 flex-grow h-14 px-4 text-md outline-none"
                        />
                        <button
                            className={`font-bold w-28 h-14 transition duration-200 ${buttonText === "Copied!" ? "bg-green-600 hover:bg-green-800 text-white" : "bg-blue-600 hover:bg-blue-800 text-white"}`}
                            onClick={handleCopyClick}
                        >
                            {buttonText}
                        </button>
                    </form>
                </div>
                <div className="mt-10">
                    <div className="flex space-x-2 items-start">
                        <p className="mt-2.5">Long URL:</p>
                        <a
                            target="_blank"
                            href={link}
                            className="text-blue-700 cursor-pointer break-all whitespace-normal overflow-wrap max-w-[500px] border-2 border-gray-300 p-2 bg-gray-100 rounded-lg"
                            title={link}
                        >
                            {link}
                        </a>
                    </div>
                    <button
                        className="ml-20 text-white bg-blue-600 font-bold w-44 h-10 hover:bg-blue-800 transition duration-200 rounded mt-6"
                        onClick={handleClick}
                    >
                        Shorten another URL
                    </button>
                    <p className="mt-8 ml-20 text-xs">
                        * Short URLs that do not have at least one click per month are disabled
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Shortened;
