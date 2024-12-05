import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";
import { FaCopy, FaSyncAlt } from "react-icons/fa";

const ApiSettings = () => {
    const [apiKey, setApiKey] = useState("");

    const getApiKey = async () => {
        try {
            const response = await axiosInstance.get("/api/users/get-api-key");
            const apiKey = response.data.apiKey;
            setApiKey(apiKey);
        } catch (error) {
            toast.error("Error fetching API key");
        }
    };

    const regenerateApiKey = async () => {
        try {
            const response = await axiosInstance.post("/api/users/regenerate-api-key");
            const newApiKey = response.data.data.apiKey;
            setApiKey(newApiKey);
            toast.success("API key regenerated successfully!");
        } catch (error) {
            toast.error("Error regenerating API key");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey)
            .then(() => toast.success("API key copied to clipboard!"))
            .catch(() => toast.error("Failed to copy API key"));
    };

    useEffect(() => {
        getApiKey();
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen p-6">
            <div className="flex flex-col md:flex-row items-center md:justify-between p-4 bg-teal-900 text-white w-full max-w-lg rounded-t-lg">
                <p className="text-lg font-medium">API Key Settings</p>
            </div>

            <div className="bg-gray-50 w-full max-w-lg shadow-md rounded-b-lg p-6">
                <div className="space-y-4">
                    <label htmlFor="apiKey" className="text-sm font-medium text-gray-600">
                        Your API Key
                    </label>
                    <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-2">
                        <input
                            id="apiKey"
                            type="text"
                            value={apiKey}
                            readOnly
                            className="w-full bg-transparent text-gray-800 text-sm outline-none"
                        />
                        <button
                            type="button"
                            onClick={copyToClipboard}
                            className="text-gray-600 hover:text-blue-600 ml-3"
                        >
                            <FaCopy size={18} />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={regenerateApiKey}
                        className="w-full bg-teal-900 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-200 flex items-center justify-center"
                    >
                        <FaSyncAlt className="mr-2" />
                        Regenerate API Key
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiSettings;