import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShareAlt, FaPen, FaTrashAlt, FaCalendarAlt, FaEye, FaExternalLinkAlt } from "react-icons/fa";
import ShareButton from "../shared/components/ShareButton.jsx";

const OneLinkCard = ({ oneLinkUrl, clicks, views, createdAt, data, onDelete }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleShareModalClick = () => {
        setShareModalOpen(true);
    };

    const handleShareModalClose = () => {
        setShareModalOpen(false);
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
        setShowDeleteModal(false);
    };

    // Helper to get initials
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : "?";
    };

    return (
        <>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 transition-all hover:shadow-md group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 bg-blue-50/50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-blue-100/50 transition-colors"></div>

                {/* Profile Image Section */}
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                    <div className="relative">
                        {data?.profilePhotoUrl ? (
                            <img
                                src={data.profilePhotoUrl}
                                alt={data.name}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        ) : (
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                                {getInitials(data?.name || data?.username)}
                            </div>
                        )}
                        {/* Status Indicator (Optional) */}
                        <div className={`absolute bottom-2 right-2 w-4 h-4 border-2 border-white rounded-full ${true ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow justify-center relative z-10">
                    <div className="space-y-4 text-center md:text-left">

                        {/* Title & URL */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{data?.name || data?.username}</h3>
                            <a href={oneLinkUrl} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors break-all text-sm md:text-base">
                                {oneLinkUrl}
                                <FaExternalLinkAlt className="w-3 h-3" />
                            </a>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black transition-all shadow-sm hover:shadow active:scale-95 text-sm font-semibold"
                                onClick={handleShareModalClick}>
                                <FaShareAlt className="w-3.5 h-3.5" />
                                <span>Share</span>
                            </button>
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-semibold"
                                onClick={() => navigate(`/customize-template?username=${data.username}&templateId=${data.templateId}`)}>
                                <FaPen className="w-3.5 h-3.5 text-gray-500" />
                                <span>Edit Style</span>
                            </button>
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 transition-all text-sm font-semibold"
                                onClick={handleDeleteClick}>
                                <FaTrashAlt className="w-3.5 h-3.5" />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>

                    {/* Footer Stats */}
                    <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center md:justify-start gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg">
                            <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                            <span>Created: {createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg">
                            <FaEye className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{views}</span> views
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full transform transition-all animate-fadeIn">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <FaTrashAlt className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                            Delete Link?
                        </h3>
                        <p className="text-gray-500 mb-6 text-center leading-relaxed text-sm">
                            This will permanently delete your OneLink page and all its data. This action cannot be undone.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2.5 text-gray-700 bg-gray-100 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2.5 text-white bg-red-600 font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
                            >
                                Delete Page
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isShareModalOpen && <ShareButton linkToShare={oneLinkUrl} isModalOpen={isShareModalOpen} onClose={handleShareModalClose} />}
        </>
    )
}

export default OneLinkCard;