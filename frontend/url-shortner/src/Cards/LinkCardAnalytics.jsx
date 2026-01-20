import React, { useEffect, useState } from "react";
import axiosInstance from "../shared/utils/axiosInstance.js";
import { FaCopy, FaShareAlt, FaEdit, FaQrcode, FaExternalLinkAlt, FaCalendarAlt, FaLink } from "react-icons/fa";
import EditLink from "../features/links/EditLink.jsx";
import ShareButton from "../shared/components/ShareButton.jsx";
import QRCodePopup from "../shared/components/QRCodePopup.jsx";
import { BASE_URL } from "../shared/utils/constants.js";
import { toast } from 'sonner';
import { InfinitySpin } from "react-loader-spinner";
import { formatDate } from "../shared/utils/helper.js";

const LinkCardAnalytics = ({ shortUrlId }) => {
    const [linkData, setLinkData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [qrCodeOpen, setQrCodeOpen] = useState(false);
    const fullUrl = `${BASE_URL}/${shortUrlId}`;
    const [refresh, setRefresh] = useState(false);

    const getLinksData = async () => {
        try {
            const response = await axiosInstance.get(`/api/urls/manage/details/${shortUrlId}`);
            setLinkData(response.data.details);
        } catch (e) {
            console.error(e);
            toast.error("Failed to load link details");
        } finally {
            setLoading(false);
        }
    };

    const handleShareModalClose = () => setShareModalOpen(false);
    const handleShareModalClick = () => setShareModalOpen(true);
    const handleEditClick = () => setEditModalOpen(true);
    const handleModalClose = () => setEditModalOpen(false);
    const handleQrCodePopup = () => setQrCodeOpen(!qrCodeOpen);

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl);
        toast.success("Copied to clipboard!");
    };

    const onEditSuccess = () => setRefresh(!refresh);

    useEffect(() => {
        getLinksData();
    }, [refresh, shortUrlId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                <InfinitySpin visible={true} width="120" color="#4f46e5" ariaLabel="loading" />
                <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading link details...</p>
            </div>
        );
    }

    if (!linkData) {
        return (
            <div className="bg-white rounded-2xl p-8 w-full text-center border border-gray-100 shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaLink className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Link Not Found</h3>
                <p className="text-gray-500 text-sm mt-1">The requested URL data could not be retrieved.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:p-8 relative overflow-hidden group">
            {/* Subtle Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-bl-full -mr-16 -mt-16 z-0 pointer-events-none group-hover:scale-105 transition-transform opacity-60"></div>

            <div className="relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                                Active Link
                            </span>
                            <span className="flex items-center text-xs text-gray-400">
                                <FaCalendarAlt className="mr-1.5" />
                                Created {formatDate(linkData.createdAt)}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight truncate" title={linkData.title}>
                            {linkData.title || "Untitled Link"}
                        </h1>
                    </div>

                    {/* Action Toolbar */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        <ActionButton icon={<FaCopy />} label="Copy" onClick={handleCopy} />
                        <ActionButton icon={<FaShareAlt />} label="Share" onClick={handleShareModalClick} />
                        <ActionButton icon={<FaEdit />} label="Edit" onClick={handleEditClick} />
                        <ActionButton icon={<FaQrcode />} label="QR Code" onClick={handleQrCodePopup} />
                    </div>
                </div>

                {/* URL Display Section */}
                <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100 hover:border-blue-200 transition-colors group/url">
                    <div className="flex items-start gap-4">
                        <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-white border border-gray-200 items-center justify-center shadow-sm p-2">
                            {linkData.logo ? (
                                <img src={linkData.logo} alt="Logo" className="w-full h-full object-contain" />
                            ) : (
                                <FaLink className="text-gray-300 w-5 h-5" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <a
                                    href={fullUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 truncate"
                                >
                                    {fullUrl.replace(/^https?:\/\//, '')}
                                    <FaExternalLinkAlt className="w-3.5 h-3.5 opacity-0 group-hover/url:opacity-100 transition-opacity" />
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="font-medium text-gray-400">Target:</span>
                                <a
                                    href={linkData.originalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate hover:text-gray-900 transition-colors max-w-full"
                                >
                                    {linkData.originalUrl}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <EditLink
                    isOpen={isEditModalOpen}
                    onClose={handleModalClose}
                    link={{ originalUrl: linkData?.originalUrl, shortUrlId }}
                    onEditSuccess={onEditSuccess}
                />

                {isShareModalOpen && (
                    <ShareButton
                        linkToShare={fullUrl}
                        isModalOpen={isShareModalOpen}
                        onClose={handleShareModalClose}
                    />
                )}

                {qrCodeOpen && (
                    <QRCodePopup
                        onClose={handleQrCodePopup}
                        qrCode={linkData.qrCode}
                        shortUrl={shortUrlId}
                    />
                )}
            </div>
        </div>
    );
};

// Helper Component for Actions
const ActionButton = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95 whitespace-nowrap"
    >
        <span className="text-lg">{icon}</span>
        <span className="hidden lg:inline">{label}</span>
    </button>
);

export default LinkCardAnalytics;
