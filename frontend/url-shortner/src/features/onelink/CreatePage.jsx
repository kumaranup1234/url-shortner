import { useState } from "react";
import success from '../../assets/icons8-checkmark.svg';
import warning from '../../assets/icons8-warning.svg';
import axiosInstance from "../../utils/axiosInstance.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-left text-3xl font-bold text-teal-900 mb-4">
                    Create a OneLink
                </h1>
                <p className="text-gray-600 mb-6 text-left">
                    Build a beautiful page to share and manage all the links that matter to you.
                </p>
                <form className="flex items-center space-x-4 mb-6" onSubmit={checkUserName}>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="py-2 px-6 bg-teal-900 text-white rounded-lg hover:bg-teal-800 transition"
                    >
                        Create Page
                    </button>
                </form>

                {message && (
                    <div className={`border p-4 mb-4 rounded-lg ${message.includes('taken') ? 'border-red-500 bg-red-100' : 'border-teal-500 bg-teal-100'}`}>
                        <div className="flex items-center space-x-2">
                            <img
                                src={message.includes('taken') ? warning : success}
                                alt="status"
                                className="h-5 w-5"
                            />
                            <p className={`text-sm ${message.includes('taken') ? 'text-red-500' : 'text-green-500'}`}>
                                {message}
                            </p>
                        </div>
                    </div>
                )}

                <div className="text-left space-y-4">
                    <p className="text-sm text-gray-600">
                        Your plan includes <span className="font-semibold">1 free OneLink page</span>.
                    </p>
                    <div className="border my-4"></div>
                    <p className="text-md font-bold text-teal-900">
                        Share all your links with OneLinks.
                    </p>
                    <p className="text-sm text-gray-600">
                        OneLink pages are an easy-to-read, flexible way to organize and share your content with the
                        power and reliability you deserve.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
