import { useEffect, useState } from "react";
import axiosInstance from "../../shared/utils/axiosInstance.js";
import { toast } from 'sonner';
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
        <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 text-white p-6 transition-colors">
                    <h3 className="text-xl font-semibold">API Key Settings</h3>
                    <p className="text-gray-400 text-sm mt-1">Manage your personal API key for external access</p>
                </div>

                <div className="p-8">
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4 mb-8 flex items-start gap-3 transition-colors">
                        <span className="text-amber-500 text-xl">⚠️</span>
                        <p className="text-sm text-amber-800 dark:text-amber-200 pt-0.5">
                            <span className="font-semibold">Note:</span> The API key is being generated, but the public API endpoints are currently in beta/development mode.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Your API Key
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow">
                                    <input
                                        id="apiKey"
                                        type="text"
                                        value={apiKey}
                                        readOnly
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm rounded-lg block p-3 pr-10 font-mono transition-colors"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={copyToClipboard}
                                    className="p-3 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    title="Copy API Key"
                                >
                                    <FaCopy size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={regenerateApiKey}
                                className="w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium py-2.5 px-6 rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                            >
                                <FaSyncAlt className={apiKey ? "" : "animate-spin"} />
                                Regenerate API Key
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiSettings;