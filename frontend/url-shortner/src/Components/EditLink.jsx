import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";
import { BASE_URL } from "../utils/constants.js";

const EditLink = ({ isOpen, onClose, link, onEditSuccess }) => {
    const [originalUrl, setOriginalUrl] = useState(link.originalUrl || " ");
    const fullUrl = `${BASE_URL}/${link.shortUrlId}`;

    useEffect(() => {
        if (isOpen && link) {
            setOriginalUrl(link.originalUrl);
        }
    }, [isOpen, link]);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/api/urls/manage/update/${link.shortUrlId}`, { newUrl: originalUrl });
            if (response.data.success) {
                toast.success("Link updated successfully!");
                onEditSuccess();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to update link!");
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 sm:mx-auto">
                <div className="flex justify-between items-center bg-teal-700 text-white p-4 rounded-t-lg">
                    <h2 className="text-lg font-bold">Edit Link</h2>
                    <button
                        className="text-2xl font-bold hover:text-red-500 focus:outline-none"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={handleEditSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Original URL</label>
                            <input
                                type="text"
                                value={originalUrl}
                                onChange={(e) => setOriginalUrl(e.target.value)}
                                className="border border-gray-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                placeholder="Enter the updated link"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Shortened URL</label>
                            <input
                                type="text"
                                value={fullUrl}
                                className="border border-gray-300 rounded-lg w-full p-2 bg-gray-100 text-gray-600 focus:outline-none"
                                readOnly
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditLink;