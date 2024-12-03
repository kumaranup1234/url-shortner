import React  from "react";
import copyIcon from "../assets/copyIcon.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import { BASE_URL } from "../utils/constants.js";
import toast from "react-hot-toast";
import {get} from "../utils/getTime.js";
import stats from "../assets/stats.svg"
import dots from "../assets/sixDots.svg";

const TopPerformingLink = ({ shortUrl, logo, title, totalClicks, originalUrl, createdAt }) => {
    const fullUrl = `${BASE_URL}/${shortUrl}`;

    const handleCopy = () => {
      navigator.clipboard.writeText(fullUrl);
        toast.success("Copied to clipboard!");
    };
    const truncateUrl = (url) => {
        const screenWidth = window.innerWidth;
        const maxLength = screenWidth < 640 ? 35 : 100;
        return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
    };


    return (
        <>
            <div className="bg-white rounded-lg p-6 w-full">
                <div className="flex items-center mb-4">
                    <img src={dots} alt="dotsIcon" className="w-5 h-5 mr-2"/>
                    <p className="text-base font-bold">Top performing link</p>
                </div>
                <div className="md:flex justify-between items-center mb-4">
                    <h1 className="flex-1 overflow-hidden md:overflow-ellipsis text-2xl md:text-3xl font-bold text-gray-800">
                        {title || "No Title Available"}
                    </h1>
                    <div className="hidden md:flex items-center space-x-4">
                        <div
                            className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                            <img src={stats} alt="Copy" className="h-5 w-5"/>
                            <span>Total Clicks: {totalClicks}</span>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                            <img src={copyIcon} alt="Copy" className="h-5 w-5"/>
                            <span>Copy</span>
                        </button>
                    </div>
                </div>

                {/* URL Section */}
                <div className="flex items-start md:space-x-4 mb-6">
                    <img
                        src={logo}
                        alt="Logo"
                        className="hidden md:block h-12 w-12 object-contain rounded-full bg-gray-200"
                    />
                    <div>
                        <a
                            href={fullUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-words">
                            {fullUrl}
                        </a>
                        <p className="mt-1 cursor-pointer text-sm text-gray-500 hover:underline break-words truncate">
                            <a href={originalUrl} target="_blank" rel="noopener noreferrer">
                                {truncateUrl(originalUrl)}
                            </a>
                        </p>
                    </div>
                </div>

                {/* Metadata Section */}
                <div className="md:hidden flex items-center space-x-2 text-sm text-gray-600">
                    <img src={calendarIcon} alt="Created At" className="h-5 w-5"/>
                    <span>{get(createdAt)}</span>
                </div>

                {/* Divider */}
                <hr className="border-gray-200 mb-4 md:mb-6 mt-4 md:mt-0"/>

                {/* Metadata Section */}
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                    <img src={calendarIcon} alt="Created At" className="h-5 w-5"/>
                    <span>{get(createdAt)}</span>
                </div>

                <div className="md:hidden flex space-x-4">
                    <div
                        className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                        <img src={stats} alt="Copy" className="h-5 w-5"/>
                        <span>Total Clicks: {totalClicks}</span>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                        <img src={copyIcon} alt="Copy" className="h-5 w-5"/>
                        <span>Copy</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default TopPerformingLink;
