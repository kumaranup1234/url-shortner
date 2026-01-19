import { useState } from "react";
import copyIcon from "../assets/copyIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import { BASE_URL } from "../utils/constants.js";

const QRCodePopup = ({ qrCode, onClose, shortUrl }) => {
    const [copied, setCopied] = useState(false);
    const fullUrl = `${BASE_URL}/${shortUrl}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = qrCode;
        link.download = "QRCode.png";
        link.click();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
                <div className="flex justify-between items-center bg-teal-700 text-white p-4 rounded-t-lg">
                    <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-300 truncate w-3/4 hover:underline"
                    >
                        <span className="text-white">Short URL: </span>
                        {shortUrl}
                    </a>
                    <button
                        className="text-xl font-bold focus:outline-none hover:text-red-500"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                <div className="flex flex-col items-center p-6">
                    <img
                        src={qrCode}
                        alt="QR Code"
                        className="w-40 h-40 mb-4 border border-gray-300 rounded-lg"
                    />

                    <div className="text-gray-700 text-center mb-4">
                        <p className="text-sm">Scan the QR code or copy/download the link below:</p>
                        <p className="text-sm font-medium text-gray-800 break-words mt-2">{fullUrl}</p>
                    </div>

                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 w-full">
                        <button
                            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                            onClick={handleDownload}
                        >
                            <img src={downloadIcon} alt="Download Icon" className="h-5 w-5 mr-2" />
                            Download QR Code
                        </button>
                        <button
                            className={`flex items-center justify-center ${copied ? "bg-green-700" : "bg-green-600 hover:bg-green-700"} text-white px-4 py-2 rounded-lg w-full`}
                            onClick={handleCopy}
                        >
                            <img src={copyIcon} alt="Copy Icon" className="h-5 w-5 mr-2" />
                            {copied ? "Copied!" : "Copy Link"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodePopup;
