import { useState } from "react";
import { toast } from 'sonner';
import { FaTimes, FaCopy, FaDownload } from "react-icons/fa";
import { BASE_URL } from "../utils/constants.js";

const QRCodePopup = ({ qrCode, onClose, shortUrl }) => {
    const [copied, setCopied] = useState(false);
    const fullUrl = `${BASE_URL}/${shortUrl}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = qrCode;
        link.download = `QRCode-${shortUrl}.png`;
        link.click();
        toast.success("QR Code downloaded!");
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-scaleIn font-sans border border-transparent dark:border-gray-700">

                {/* Header - Dark Gray/Green to match theme */}
                <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
                    <h3 className="text-white text-lg font-semibold tracking-wide">QR Code</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col items-center">

                    {/* QR Code Container */}
                    <div className="p-4 bg-white rounded-2xl mb-6 shadow-sm border border-gray-200 hover:border-blue-400 transition-colors duration-300">
                        <img
                            src={qrCode}
                            alt="QR Code"
                            className="w-48 h-48 object-contain"
                        />
                    </div>

                    {/* URL Display */}
                    <div className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 mb-6 text-center border border-gray-100 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1 uppercase tracking-wider font-semibold">Scan to visit</p>
                        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm truncate">{fullUrl}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex w-full gap-3">
                        <button
                            onClick={handleCopy}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all ${copied
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <FaCopy className="w-4 h-4" />
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 text-white py-2.5 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                        >
                            <FaDownload className="w-4 h-4" />
                            Download
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QRCodePopup;
