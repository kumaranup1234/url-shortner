import React, { useState, useEffect } from "react";
import axiosInstance from "../shared/utils/axiosInstance";
import { toast } from 'sonner';
import { FaCopy, FaEye, FaEyeSlash, FaKey, FaCode, FaServer, FaCheckCircle, FaTrashAlt, FaPen, FaLink } from 'react-icons/fa';

const ApiDocs = () => {
    const [apiKey, setApiKey] = useState("********************************");
    const [showKey, setShowKey] = useState(false);

    const fetchApiKey = async () => {
        try {
            const response = await axiosInstance.get("/api/users/profile");
            if (response.data && response.data.data && response.data.data.apiKey) {
                setApiKey(response.data.data.apiKey);
            }
        } catch (error) {
            console.error("Error fetching API key", error);
        }
    };

    useEffect(() => {
        fetchApiKey();
    }, []);

    const copyToClipboard = () => {
        if (apiKey === "********************************") {
            toast.error("Please log in to view your API key");
            return;
        }
        navigator.clipboard.writeText(apiKey);
        toast.success("API Key copied to clipboard!");
    };

    const endpoints = [
        {
            method: "POST",
            path: "/api/shorten",
            description: "Create a short URL. Generates a unique short ID and QR code.",
            headers: { "x-api-key": "YOUR_API_KEY", "Content-Type": "application/json" },
            body: { originalUrl: "https://example.com" },
            response: {
                success: true,
                message: "URL shortened successfully",
                data: {
                    originalUrl: "https://example.com",
                    shortUrl: "AbCdEf",
                    shortUrlFull: "https://trim.url/AbCdEf",
                    qrCode: "data:image/png;base64,..."
                }
            }
        },
        {
            method: "GET",
            path: "/api/details/:shortUrlId",
            description: "Retrieve details of a specific short URL including metadata.",
            headers: { "x-api-key": "YOUR_API_KEY" },
            body: null,
            response: {
                success: true,
                data: {
                    originalUrl: "https://example.com",
                    shortUrl: "AbCdEf",
                    totalClicks: 12,
                    isActive: true,
                    createdAt: "2024-01-01T12:00:00.000Z"
                }
            }
        },
        {
            method: "GET",
            path: "/api/analytics/:shortUrlId",
            description: "Get click analytics for a short URL used for tracking performance.",
            headers: { "x-api-key": "YOUR_API_KEY" },
            body: null,
            response: {
                success: true,
                data: {
                    totalClicks: 45,
                    lastAccessed: "2024-01-02T15:30:00.000Z",
                    createdAt: "2024-01-01T12:00:00.000Z"
                }
            }
        },
        {
            method: "PUT",
            path: "/api/update/:shortUrlId",
            description: "Update the destination of a short URL.",
            headers: { "x-api-key": "YOUR_API_KEY", "Content-Type": "application/json" },
            body: { originalUrl: "https://new-example.com" },
            response: {
                success: true,
                message: "URL updated successfully",
                data: {
                    shortUrl: "AbCdEf",
                    originalUrl: "https://new-example.com"
                }
            }
        },
        {
            method: "DELETE",
            path: "/api/delete/:shortUrlId",
            description: "Delete a short URL.",
            headers: { "x-api-key": "YOUR_API_KEY" },
            body: null,
            response: {
                success: true,
                message: "URL deleted successfully"
            }
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4 text-blue-600">
                        <FaCode className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">API</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Integrate our powerful URL shortening service directly into your applications using our simple, secure, and robust REST API.
                    </p>
                </div>

                {/* Authentication Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    <div className="p-8 border-b border-gray-100 bg-white/50 backdrop-blur-sm relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaKey className="text-yellow-500" /> Authentication
                            </h2>
                            <p className="text-gray-500 mt-1">Include your unique API key in the <code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-mono text-sm">x-api-key</code> header.</p>
                        </div>
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-bold text-xs uppercase tracking-wide border border-blue-100">
                            <FaServer className="w-3 h-3" />
                            Production Ready
                        </span>
                    </div>

                    <div className="p-8 bg-gray-50/50">
                        <div className="bg-gray-900 rounded-xl p-1 shadow-inner border border-gray-800 flex items-center justify-between group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                            <div className="flex-1 px-4 py-3 overflow-hidden">
                                <span className="text-xs text-gray-500 font-mono block mb-1">YOUR SECRET KEY</span>
                                <code className="text-green-400 font-mono text-sm md:text-base break-all tracking-wide">
                                    {showKey && apiKey !== "********************************" ? apiKey : "•••• •••• •••• •••• •••• •••• •••• ••••"}
                                </code>
                            </div>
                            <div className="flex items-center pr-2 gap-1">
                                <button
                                    onClick={() => setShowKey(!showKey)}
                                    className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                                    title={showKey ? "Hide API Key" : "Show API Key"}
                                >
                                    {showKey ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className="p-2.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-all"
                                    title="Copy API Key"
                                >
                                    <FaCopy className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-3 text-center">
                            Keep your API key secret. Do not share it in client-side code.
                        </p>
                    </div>
                </div>

                {/* Base URL */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <FaLink className="opacity-80" /> Base URL
                        </h3>
                        <p className="text-blue-100 mt-1 text-sm">Prefix all requests with this URL</p>
                    </div>
                    <code className="relative z-10 px-5 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 font-mono font-medium text-lg tracking-wide selection:bg-white selection:text-blue-600">
                        {window.location.origin}/api
                    </code>
                </div>

                {/* Endpoints */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900 pb-2">EndpointsReference</h2>

                    <div className="grid gap-8">
                        {endpoints.map((endpoint, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/30">
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm min-w-[80px] text-center tracking-wide
                                            ${endpoint.method === 'GET' ? 'bg-blue-50 text-blue-700 border border-blue-100' : ''}
                                            ${endpoint.method === 'POST' ? 'bg-green-50 text-green-700 border border-green-100' : ''}
                                            ${endpoint.method === 'PUT' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : ''}
                                            ${endpoint.method === 'DELETE' ? 'bg-red-50 text-red-700 border border-red-100' : ''}
                                        `}>
                                            {endpoint.method}
                                        </span>
                                        <code className="text-lg font-mono text-gray-700 font-semibold">{endpoint.path}</code>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">{endpoint.description}</p>
                                </div>

                                <div className="p-6 md:p-8 grid lg:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                                Request Headers
                                            </h4>
                                            <pre className="bg-[#1e293b] rounded-xl p-4 text-xs font-mono text-blue-300 overflow-x-auto shadow-inner border border-gray-800 custom-scrollbar">
                                                {JSON.stringify(endpoint.headers, null, 2)}
                                            </pre>
                                        </div>

                                        {endpoint.body && (
                                            <div>
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                                    Request Body
                                                </h4>
                                                <pre className="bg-[#1e293b] rounded-xl p-4 text-xs font-mono text-yellow-300 overflow-x-auto shadow-inner border border-gray-800 custom-scrollbar">
                                                    {JSON.stringify(endpoint.body, null, 2)}
                                                </pre>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                            <FaCheckCircle className="text-green-500" /> Example Response
                                        </h4>
                                        <pre className="bg-[#0f172a] rounded-xl p-4 text-xs font-mono text-green-300 overflow-x-auto h-full shadow-inner border border-gray-800 custom-scrollbar">
                                            {JSON.stringify(endpoint.response, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ApiDocs;