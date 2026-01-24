import { toast } from 'sonner';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaTimes } from "react-icons/fa";

const ShareButton = ({ linkToShare, isModalOpen, onClose }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(linkToShare);
        toast.success("Link copied to clipboard!");
    };

    const handleShare = (platform) => {
        const text = `Check out this link: ${linkToShare}`;
        let url = "";

        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(text)}`;
                break;
            default:
                break;
        }

        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            toast.error("Sharing not supported on this platform directly.");
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-scaleIn font-sans border border-transparent dark:border-gray-700">

                {/* Header - bg-gray-900 to match navbar */}
                <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
                    <h3 className="text-white text-lg font-semibold tracking-wide">Share Link</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">

                    {/* Social Media Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {/* Facebook */}
                        <button
                            onClick={() => handleShare('facebook')}
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-blue-600 transition-all group-hover:scale-110 group-hover:bg-blue-50 dark:group-hover:bg-gray-600 shadow-sm border border-gray-100 dark:border-gray-600">
                                <FaFacebook className="w-7 h-7" />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200">Facebook</span>
                        </button>

                        {/* X (Twitter) */}
                        <button
                            onClick={() => handleShare('twitter')}
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-800 dark:text-white transition-all group-hover:scale-110 group-hover:bg-gray-100 dark:group-hover:bg-gray-600 shadow-sm border border-gray-100 dark:border-gray-600">
                                <FaTwitter className="w-6 h-6" />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200">X</span>
                        </button>

                        {/* Instagram (Visual Only mostly) */}
                        <button
                            className="flex flex-col items-center gap-2 group"
                            onClick={() => toast.info("Instagram sharing is best done via mobile app copy.")}
                        >
                            <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-pink-600 transition-all group-hover:scale-110 group-hover:bg-pink-50 dark:group-hover:bg-gray-600 shadow-sm border border-gray-100 dark:border-gray-600">
                                <FaInstagram className="w-7 h-7" />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200">Instagram</span>
                        </button>

                        {/* WhatsApp */}
                        <button
                            onClick={() => handleShare('whatsapp')}
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-green-500 transition-all group-hover:scale-110 group-hover:bg-green-50 dark:group-hover:bg-gray-600 shadow-sm border border-gray-100 dark:border-gray-600">
                                <FaWhatsapp className="w-7 h-7" />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200">WhatsApp</span>
                        </button>
                    </div>

                    {/* Copy Link Input Section */}
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            readOnly
                            value={linkToShare}
                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm rounded-lg block p-3 pr-24 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
                        />
                        <button
                            onClick={handleCopy}
                            className="absolute right-1 top-1 bottom-1 px-4 rounded-md text-sm font-medium transition-all bg-gray-900 dark:bg-gray-700 text-white hover:bg-black dark:hover:bg-gray-600"
                        >
                            Copy
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ShareButton;
