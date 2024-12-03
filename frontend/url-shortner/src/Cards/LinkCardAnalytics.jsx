import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import copyIcon from "../assets/copyIcon.svg";
import qrCode from '../assets/qrcode.svg'
import calendarIcon from "../assets/calendarIcon.svg";
import shareIcon from "../assets/shareIcon.svg";
import editIcon from "../assets/editIcon.svg";
import EditLink from "../Components/EditLink.jsx";
import ShareButton from "../Components/ShareButton.jsx";
import QRCodePopup from "../Components/QRCodePopup.jsx";
import { BASE_URL } from "../utils/constants.js";
import toast from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";
import {get} from "../utils/getTime.js";

const LinkCardAnalytics = ({ shortUrlId}) => {
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
        } finally {
            setLoading(false);
        }
    };

    const handleShareModalClose = () => setShareModalOpen(false);
    const handleShareModalClick = () => setShareModalOpen(true);
    const handleEditClick = () => setEditModalOpen(true);
    const handleModalClose = () => setEditModalOpen(false);
    const handleQrCodePopup = () => {
        setQrCodeOpen(!qrCodeOpen);
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl);
        toast.success("Copied to clipboard!");
    };

    const onEditSuccess = () => setRefresh(!refresh);

    const truncateUrl = (url) => {
        const screenWidth = window.innerWidth;
        const maxLength = screenWidth < 640 ? 35 : 100;
        return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
    };

    useEffect(() => {
        getLinksData();
    }, [refresh]);

    return (
        <>
            {loading ? (
                <div className="rounded-lg p-4 h-auto flex md:flex-col items-center justify-center bg-white">
                    <InfinitySpin
                        visible={true}
                        width="100"
                        color="#4fa94d"
                        ariaLabel="infinity-spin-loading"
                    />
                    <p className="mt-4 text-gray-600">Preparing your link data...</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg p-6 w-full">
                    {/* Header Section */}
                    <div className="md:flex justify-between items-center mb-4">
                        <h1 className="flex-1 overflow-hidden md:overflow-ellipsis text-2xl md:text-3xl font-bold text-gray-800">
                            {linkData?.title || "No Title Available"}
                        </h1>
                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={handleCopy}
                                className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                                <img src={copyIcon} alt="Copy" className="h-5 w-5"/>
                                <span>Copy</span>
                            </button>
                            <button
                                onClick={handleShareModalClick}
                                className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                                <img src={shareIcon} alt="Share" className="h-5 w-5"/>
                                <span>Share</span>
                            </button>
                            <button
                                onClick={handleEditClick}
                                className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                                <img src={editIcon} alt="Edit" className="h-5 w-5"/>
                                <span>Edit</span>
                            </button>
                            <button
                                onClick={handleQrCodePopup}
                                className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                                <img src={qrCode} alt="Edit" className="h-5 w-5"/>
                                <span>QrCode</span>
                            </button>
                        </div>
                    </div>

                    {/* URL Section */}
                    <div className="flex items-start md:space-x-4 mb-6">
                        <img
                            src={linkData?.logo}
                            alt="Logo"
                            className="hidden md:block h-12 w-12 object-contain rounded-full bg-gray-200"
                        />
                        <div>
                            <a
                                href={fullUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline break-words">
                                {fullUrl}
                            </a>
                            <p className="mt-1 cursor-pointer text-sm text-gray-500 hover:underline break-words truncate">
                                <a href={linkData?.originalUrl} target="_blank" rel="noopener noreferrer">
                                    {truncateUrl(linkData?.originalUrl)}
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Metadata Section */}
                    <div className="md:hidden flex items-center space-x-2 text-sm text-gray-600">
                        <img src={calendarIcon} alt="Created At" className="h-5 w-5"/>
                        <span>{get(linkData.createdAt)}</span>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-200 mb-4 md:mb-6 mt-4 md:mt-0"/>

                    {/* Metadata Section */}
                    <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                        <img src={calendarIcon} alt="Created At" className="h-5 w-5"/>
                        <span>{get(linkData.createdAt)}</span>
                    </div>

                    <div className="md:hidden flex space-x-4">
                        <button
                            onClick={handleCopy}
                            className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                            <img src={copyIcon} alt="Copy" className="h-5 w-5"/>
                            <span>Copy</span>
                        </button>
                        <button
                            onClick={handleShareModalClick}
                            className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                            <img src={shareIcon} alt="Share" className="h-5 w-5"/>
                            <span>Share</span>
                        </button>
                        <button
                            onClick={handleEditClick}
                            className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                            <img src={editIcon} alt="Edit" className="h-5 w-5"/>
                            <span>Edit</span>
                        </button>
                        <button
                            onClick={handleQrCodePopup}
                            className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                            <img src={qrCode} alt="Edit" className="h-5 w-5"/>
                            <span>QrCode</span>
                        </button>
                    </div>


                    {/* Edit Modal */}
                    <EditLink
                        isOpen={isEditModalOpen}
                        onClose={handleModalClose}
                        link={{
                            originalUrl: linkData?.originalUrl,
                            shortUrlId,
                        }}
                        onEditSuccess={onEditSuccess}
                    />

                    {/* Share Modal */}
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
            )}
        </>
    );
};

export default LinkCardAnalytics;
