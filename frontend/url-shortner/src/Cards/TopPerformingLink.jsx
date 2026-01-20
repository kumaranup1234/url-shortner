import React from "react";
import { BASE_URL } from "../shared/utils/constants.js";
import { toast } from 'sonner';
import { formatDate } from "../shared/utils/helper.js";
import { FaCopy, FaCalendarAlt, FaChartLine, FaExternalLinkAlt, FaTrophy } from "react-icons/fa";

const TopPerformingLink = ({ shortUrl, logo, title, totalClicks, originalUrl, createdAt }) => {
    const fullUrl = `${BASE_URL}/${shortUrl}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl);
        toast.success("Copied to clipboard!");
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 w-full group relative overflow-hidden">
            {/* Subtle Background Accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-bl-[100px] -mr-16 -mt-16 z-0 pointer-events-none group-hover:scale-105 transition-transform opacity-60"></div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-100/50 text-amber-600">
                        <FaTrophy className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Top Performer</p>
                        <p className="text-sm font-medium text-gray-600">Most clicked link</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <FaChartLine className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-bold text-gray-800">{totalClicks}</span>
                    <span className="text-xs text-gray-400 font-medium">clicks</span>
                </div>
            </div>

            <div className="relative z-10">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight mb-6 break-words line-clamp-2" title={title || "No Title Available"}>
                    {title || "No Title Available"}
                </h1>

                {/* URL Section */}
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100 group/url hover:border-blue-200 transition-colors">
                    <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-white border border-gray-100 items-center justify-center p-2 shadow-sm">
                        {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain" /> : <FaExternalLinkAlt className="text-gray-300 w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-center justify-between gap-4 mb-1">
                            <a
                                href={fullUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 font-bold text-lg hover:underline truncate flex-1 block"
                            >
                                /{shortUrl}
                            </a>
                            <button
                                onClick={handleCopy}
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200 text-xs font-semibold transition-all shadow-sm"
                            >
                                <FaCopy className="w-3.5 h-3.5" />
                                Copy
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 truncate hover:text-gray-700 transition-colors cursor-default" title={originalUrl}>
                            {originalUrl}
                        </p>
                    </div>
                    {/* Mobile Copy Button */}
                    <button
                        onClick={handleCopy}
                        className="sm:hidden w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 font-medium text-sm shadow-sm active:bg-gray-50"
                    >
                        <FaCopy className="w-4 h-4" />
                        Copy Link
                    </button>
                </div>

                {/* Footer Metadata */}
                <div className="flex items-center justify-between text-xs font-medium text-gray-400 pt-2">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="w-3.5 h-3.5" />
                        <span>Created {formatDate(createdAt)}</span>
                    </div>
                    <a href={fullUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                        Visit Link <FaExternalLinkAlt className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TopPerformingLink;
