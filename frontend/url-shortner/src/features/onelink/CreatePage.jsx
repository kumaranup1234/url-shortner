import { useState } from "react";
import success from '../../assets/icons8-checkmark.svg';
import warning from '../../assets/icons8-warning.svg';
import axiosInstance from "../../shared/utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

const CreatePage = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const checkUserName = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/onelink/check', { username });

            if (response.data.success) {
                toast.success(response.data.message);
                setMessage(response.data.message);
                navigate(`/templates?username=${username}`);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage("An error occurred while checking the username.");
            setUsername("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Claim your link
                    </h1>
                    <p className="text-gray-600">
                        Create a unique, beautiful profile to house all your links.
                    </p>
                </div>

                <form className="mb-8" onSubmit={checkUserName}>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 font-medium">trim.url/</span>
                            </div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full pl-20 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="py-3 px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg whitespace-nowrap"
                        >
                            Create Page
                        </button>
                    </div>
                </form>

                {message && (
                    <div className={`p-4 mb-6 rounded-xl flex items-start gap-3 ${message.includes('taken') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                        <img
                            src={message.includes('taken') ? warning : success}
                            alt="status"
                            className={`h-5 w-5 mt-0.5 ${message.includes('taken') ? '' : 'filter hue-rotate-90'}`}
                        />
                        <p className="text-sm font-medium">
                            {message}
                        </p>
                    </div>
                )}

                <div className="border-t border-gray-100 pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-900">1 free OneLink page</span> included in your plan.
                        </p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        OneLink pages are the simplest way to aggregate your content. Perfect for social media bios, portfolios, and more.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
