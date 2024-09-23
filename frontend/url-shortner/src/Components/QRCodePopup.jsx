import { useState } from 'react';
import copyIcon from "../assets/copyIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import {BASE_URL} from "../utils/constants.js";

const QRCodePopup = ({ qrCode, onClose, shortUrl }) => {
    const [copied, setCopied] = useState(false);
    const fullUrl=`${BASE_URL}/${shortUrl}`



    const handleCopy = () => {
        navigator.clipboard.writeText(qrCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = 'QRCode.png';
        link.click();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 grid items-center justify-center z-50">
            {/* Modal Box */}
            <div className="bg-white p-6 rounded-lg relative w-96">
                {/* Navbar Section */}
                <div className="flex justify-between items-center mb-4 bg-teal-900 text-white p-4 rounded-t-lg -mx-6 -mt-6 rounded-tr-lg rounded-tl-lg">
                    {/* Link on the left */}

                    <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 truncate">
                        <span className="text-white cursor-default">Short Id: </span>{shortUrl}
                    </a>
                    {/* Close button on the right */}
                    <button className="text-white text-2xl font-bold" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {/* QR Code Section */}
                <div className="flex flex-col items-center mb-4">
                    <img src={qrCode} alt="QR Code" className="w-40 h-40 mb-4" />
                </div>

                {/* Buttons Section */}
                <div className="flex space-x-4 justify-center">
                    <div className="bg-blue-500 flex items-center justify-start px-4 py-2 hover:bg-green-700 cursor-pointer rounded" onClick={handleDownload}>
                        <img src={downloadIcon} className="h-5 w-4" alt="Download Icon"/>
                        <button
                            className="text-white px-4 py-2"
                        >
                            Download
                        </button>
                    </div>


                    <div
                        className="bg-green-500 flex items-center justify-start px-4 py-2 hover:bg-green-800 cursor-pointer rounded"
                        onClick={handleCopy}>
                        <img src={copyIcon} className="h-5 w-4" alt="Copy Icon"/>
                        <button
                            className="text-white px-4 py-2 rounded"
                        >
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodePopup;
