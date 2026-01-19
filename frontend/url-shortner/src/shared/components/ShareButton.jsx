import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import toast from "react-hot-toast";
import twitter from "../assets/twitterx.svg"

const ShareButton = ({ linkToShare, isModalOpen, onClose }) => {
    const socialMediaLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`,
        x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(linkToShare)}&text=Check%20this%20out!`,
        instagram: "https://www.instagram.com/",
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(linkToShare)}`,
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(linkToShare);
        toast.success("Copied");
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-5/12">
                        {/* Navbar Section */}
                        <div className="flex justify-between items-center mb-4 bg-teal-900 text-white p-4 -mx-6 -mt-6 rounded-tr-lg rounded-tl-lg">
                            <p className="text-white font-bold text-2xl">Share Link</p>
                            <button className="text-white text-2xl font-bold" onClick={onClose}>
                                &times;
                            </button>
                        </div>


                        <div className="flex space-x-1 justify-around mb-6">
                            <a
                                href={socialMediaLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center bg-gray-100 p-2 w-24 h-24 rounded-lg hover:bg-gray-200"
                            >
                                <FaFacebookF className="text-blue-700 text-2xl mb-2" />
                                <span className="text-sm">Facebook</span>
                            </a>
                            <a
                                href={socialMediaLinks.x}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center bg-gray-100 p-2 w-24 h-24 rounded-lg hover:bg-gray-200"
                            >
                                <img src={twitter} className="text-blue-400 text-2xl mb-2 h-8 w-8"  alt="X icon"/>
                                <span className="text-sm">X</span>
                            </a>
                            <a
                                href={socialMediaLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center bg-gray-100 p-2 w-24 h-24 rounded-lg hover:bg-gray-200"
                            >
                                <FaInstagram className="text-pink-600 text-2xl mb-2" />
                                <span className="text-sm">Instagram</span>
                            </a>
                            <a
                                href={socialMediaLinks.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center bg-gray-100 p-2 w-24 h-24 rounded-lg hover:bg-gray-200"
                            >
                                <FaWhatsapp className="text-green-500 text-2xl mb-2" />
                                <span className="text-sm">WhatsApp</span>
                            </a>
                        </div>


                        <form className="flex items-center border rounded-lg p-2">
                            <input
                                type="text"
                                value={linkToShare}
                                className="border-none w-full p-2 rounded-lg text-sm"
                                readOnly
                            />
                            <button
                                type="button"
                                className="bg-teal-900 text-white px-4 py-2 ml-2 rounded-lg"
                                onClick={handleCopy}
                            >
                                Copy
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareButton;
