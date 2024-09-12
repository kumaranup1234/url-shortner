import graphIcon from "../assets/graphIcon.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import tagIcon from "../assets/tagIcon.svg";
import editIcon from "../assets/editIcon.svg";
import copyIcon from "../assets/copyIcon.svg";
import shareIcon from "../assets/shareIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import {BASE_URL} from "../utils/constants.js";

const LinkCard = ({ originalUrl, shortenedUrl, date }) => {
    const maxLength = 50;

    const trimmedUrl = originalUrl.length > maxLength
        ? `${originalUrl.slice(0, maxLength)}...`
        : originalUrl;
    const fullUrl = `${BASE_URL}/${shortenedUrl}`;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-4 ml-16 mr-16 mt-6">
            {/* Left Section */}
            <div className="grid space-y-2">
                <div className="grid">
                    {/* Original URL */}
                    <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="text-gray-800 font-semibold">
                        {trimmedUrl}
                    </a>
                    {/* Shortened URL */}
                    <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {shortenedUrl}
                    </a>
                </div>
                <div className="flex space-x-4">
                    <div className="flex items-center">
                        <img src={graphIcon} alt="Graph Icon" className="mr-1" />
                        <button className="text-sm text-gray-700">Click data</button>
                    </div>

                    <div className="flex items-center">
                        <img src={calendarIcon} alt="Calendar Icon" className="mr-1" />
                        <p className="text-sm text-gray-700">{date}</p>
                    </div>

                    <div className="flex items-center">
                        <img src={tagIcon} alt="Tag Icon" className="mr-1" />
                        <p className="text-sm text-gray-700">Instagram</p>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex space-x-4">
                <div className="flex items-center justify-center bg-gray-200 rounded px-2 py-1 h-8">
                    <img src={copyIcon} className="h-5 w-5 mr-1" alt="Copy Icon"/>
                    <button className="text-sm">Copy</button>
                </div>

                <div className="flex items-center justify-center bg-gray-200 rounded px-2 py-1 h-8">
                    <img src={shareIcon} className="h-5 w-5 mr-1" alt="Share Icon"/>
                    <button className="text-sm">Share</button>
                </div>

                <div className="flex items-center justify-center bg-gray-200 rounded px-2 py-1 h-8">
                    <img src={editIcon} className="h-5 w-5 mr-1" alt="Edit Icon"/>
                    <button className="text-sm">Edit</button>
                </div>

                <div className="flex items-center justify-center bg-gray-200 rounded px-2 py-1 h-8">
                    <img src={deleteIcon} className="h-5 w-5 mr-1" alt="delete Icon"/>
                    <button className="text-sm">Delete</button>
                </div>

            </div>
        </div>
    );
};

export default LinkCard;
