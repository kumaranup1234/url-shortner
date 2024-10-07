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
            console.error("Error updating link", error);
            toast.error("Failed to update link.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg relative w-1/2"> {/* Larger modal */}
                {/* Navbar Section */}
                <div className="flex justify-between items-center mb-4 bg-teal-900 text-white p-4 -mx-6 -mt-6 rounded-tr-lg rounded-tl-lg">
                    <p className="text-white font-bold">Edit Link</p>
                    {/* Close Button */}
                    <button className="text-white text-2xl font-bold" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={handleEditSubmit}>
                        {/* Original URL Section */}
                        <label className="block text-sm font-medium text-gray-700">Original URL</label>
                        <input
                            type="text"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            className="border rounded w-full p-2 mt-1 mb-4"
                            placeholder="Enter the updated link"
                            required
                        />

                        {/* Shortened URL Section */}
                        <label className="block text-sm font-medium text-gray-700">Shortened URL</label>
                        <input
                            type="text"
                            value={fullUrl}
                            className="border rounded w-full p-2 mt-1 mb-4"
                            readOnly
                            required
                        />

                        <div className="flex justify-between mt-6">
                            <button type="button" onClick={onClose} className="bg-red-600 text-white rounded px-4 py-2">
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
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
