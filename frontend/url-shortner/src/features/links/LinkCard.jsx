import graphIcon from "../../assets/graphIcon.svg";
import calendarIcon from "../../assets/calendarIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import copyIcon from "../../assets/copyIcon.svg";
import shareIcon from "../../assets/shareIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import qrIcon from "../../assets/qrIcon.svg";
import threeDotsIcon from "../../assets/threeDotsIcon.svg";
import { BASE_URL } from "../../shared/utils/constants.js";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import QRCodePopup from "../../shared/components/QRCodePopup.jsx";
import { toast } from 'sonner';
import EditLink from "./EditLink.jsx";
import ShareButton from "../../shared/components/ShareButton.jsx";
import useOutsideClick from "../../shared/hooks/useOutsideClick.js";
import axiosInstance from "../../shared/utils/axiosInstance.js";


const LinkCard = ({ originalUrl, shortenedUrl, date, qrCode, title, logo, totalClicks, onEditSuccess, onDeleteSuccess }) => {
    const [maxLength, setMaxLength] = useState(40);
    const [showPopup, setShowPopup] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [isDropdownUpward, setIsDropdownUpward] = useState(false);
    const dropdownRef = useRef(null);
    const dropDownDirection = useRef(null);
    const dropdownDirectionSet = useRef(false);
    const trimmedUrl = originalUrl.length > maxLength ? `${originalUrl.slice(0, maxLength)}...` : originalUrl;
    const fullUrl = `${BASE_URL}/${shortenedUrl}`;


    // custom hook for outside click detection
    useOutsideClick(dropdownRef, () => setShowDropdown(false));

    useEffect(() => {
        const updateMaxLength = () => {
            if (window.innerWidth < 430) {
                setMaxLength(30);
            } else {
                setMaxLength(40);
            }
        };

        updateMaxLength();  // Call on mount
        window.addEventListener("resize", updateMaxLength);

        return () => {
            window.removeEventListener("resize", updateMaxLength);
        };
    }, []);

    const handleQrIconClick = () => {
        if (qrCode) {
            setShowPopup(true);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl);
        toast.success("Copied");
    };

    const handleEditClick = () => {
        setEditModalOpen(true);
    };

    const handleModalClose = () => {
        setEditModalOpen(false);
    };

    const handleShareModalClick = () => {
        setShareModalOpen(true);
    };

    const handleShareModalClose = () => {
        setShareModalOpen(false);
    };

    const handleDeleteClick = () => {
        toast("Delete this link?", {
            description: "This action cannot be undone.",
            action: {
                label: "Delete",
                onClick: () => executeDelete(),
            },
            cancel: {
                label: "Cancel",
            },
            className: "bg-red-50 border-red-200",
            actionButtonStyle: {
                backgroundColor: "#ef4444",
                color: "white",
            }
        });
    };

    const executeDelete = () => {
        const myPromise = axiosInstance.delete(`/api/urls/manage/delete/${shortenedUrl}`);

        toast.promise(myPromise, {
            loading: 'Deleting...',
            success: 'URL deleted successfully!',
            error: 'Error deleting URL'
        });

        myPromise.then(() => {
            onDeleteSuccess();
        }).catch((e) => {
            console.error(e);
        });
    };

    useEffect(() => {
        if (showDropdown) {
            const dropdown = dropDownDirection.current;
            const dropdownRect = dropdown.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // only set the dropdown direction when it is first opened
            if (!dropdownDirectionSet.current) {
                if (dropdownRect.bottom > viewportHeight) {
                    setIsDropdownUpward(true);
                } else {
                    setIsDropdownUpward(false);
                }
                dropdownDirectionSet.current = true;
            }
        }
    }, [showDropdown]);

    return (
        <div className="w-full bg-white border border-gray-100 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 p-5 mb-4 relative group">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                {/* Left Section: Icon & Info */}
                <div className="flex items-start gap-4 flex-1">
                    {/* Logo/Icon */}
                    <div className="flex-shrink-0">
                        <img
                            src={logo}
                            alt="Link Logo"
                            className="h-12 w-12 object-contain rounded-full bg-gray-50 border border-gray-100 p-1"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 min-w-0 w-0">
                        {/* Title & Short URL line */}
                        <div className="flex flex-wrap items-baseline gap-2 mb-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate max-w-full" title={title || "Untitled Link"}>
                                {title || "Untitled Link"}
                            </h3>
                        </div>

                        {/* Short URL (Blue) */}
                        <a
                            href={fullUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 font-medium hover:text-blue-700 hover:underline truncate text-base mb-1 block max-w-full"
                            title={fullUrl}
                        >
                            {fullUrl}
                        </a>

                        {/* Original URL (Subtle) */}
                        <a
                            href={originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 text-sm hover:text-gray-600 truncate mb-3 block max-w-full"
                            title={originalUrl}
                        >
                            {originalUrl}
                        </a>

                        {/* Metrics & Actions Row */}
                        <div className="flex flex-wrap items-center gap-4 mt-auto">
                            {/* Clicks */}
                            <Link to={`/analytics/${shortenedUrl}`} className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 px-2 py-1 rounded-md">
                                <img src={graphIcon} alt="Clicks" className="w-4 h-4 mr-1.5 opacity-70" />
                                <span className="font-medium">{totalClicks}</span>
                                <span className="ml-1 text-gray-400 font-normal">clicks</span>
                            </Link>

                            {/* Date */}
                            <div className="flex items-center text-sm text-gray-400 px-2 py-1">
                                <img src={calendarIcon} alt="Date" className="w-4 h-4 mr-1.5 opacity-70" />
                                <span>{date}</span>
                            </div>

                            {/* Divider for desktop */}
                            <div className="hidden md:block h-4 w-px bg-gray-200"></div>

                            {/* Action Buttons (Visible on desktop, condensed on mobile) */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors border border-gray-100"
                                >
                                    <img src={copyIcon} alt="" className="w-4 h-4 opacity-70" />
                                    Copy
                                </button>

                                {qrCode && (
                                    <button
                                        onClick={handleQrIconClick}
                                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                                        title="Show QR Code"
                                    >
                                        <img src={qrIcon} alt="QR" className="w-5 h-5 opacity-70" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Menu */}
                <div ref={dropdownRef} className="absolute top-4 right-4 md:relative md:top-auto md:right-auto self-start">
                    <button
                        onClick={toggleDropdown}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors focus:outline-none"
                    >
                        <img src={threeDotsIcon} alt="More" className="h-5 w-5" />
                    </button>

                    {showDropdown && (
                        <div ref={dropDownDirection} className={`absolute right-0 w-48 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-20 ${isDropdownUpward ? "bottom-full mb-2" : "top-full mt-2"}`}>
                            <div className="py-1">
                                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2" onClick={handleCopy}>
                                    <img src={copyIcon} className="h-4 w-4 opacity-70" />
                                    Copy Link
                                </button>
                                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2" onClick={handleShareModalClick}>
                                    <img src={shareIcon} className="h-4 w-4 opacity-70" />
                                    Share Link
                                </button>
                                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2" onClick={handleEditClick}>
                                    <img src={editIcon} className="h-4 w-4 opacity-70" />
                                    Edit Details
                                </button>
                                <div className="h-px bg-gray-100 my-1"></div>
                                <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2" onClick={handleDeleteClick}>
                                    <img src={deleteIcon} className="h-4 w-4 opacity-70" />
                                    Delete Link
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <EditLink
                isOpen={isEditModalOpen}
                onClose={handleModalClose}
                link={{ originalUrl, shortUrlId: shortenedUrl }}
                onEditSuccess={onEditSuccess}
            />

            {isShareModalOpen && <ShareButton linkToShare={fullUrl} isModalOpen={isShareModalOpen} onClose={handleShareModalClose} />}
            {showPopup && <QRCodePopup qrCode={qrCode} onClose={() => setShowPopup(false)} shortUrl={shortenedUrl} />}
        </div>
    );
};

export default LinkCard;
