import graphIcon from "../assets/graphIcon.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import editIcon from "../assets/editIcon.svg";
import copyIcon from "../assets/copyIcon.svg";
import shareIcon from "../assets/shareIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import qrIcon from "../assets/qrIcon.svg";
import threeDotsIcon from "../assets/threeDotsIcon.svg";
import { BASE_URL } from "../utils/constants.js";
import {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import QRCodePopup from "../Components/QRCodePopup.jsx";
import toast from "react-hot-toast";
import EditLink from "../Components/EditLink.jsx";
import ShareButton from "../Components/ShareButton.jsx";
import UseOutsideClick from "../hooks/useOutsideClick.jsx";
import axiosInstance from "../utils/axiosInstance.js";


const LinkCard = ({ originalUrl, shortenedUrl, date, qrCode, totalClicks, onEditSuccess, onDeleteSuccess }) => {
    const maxLength = 50;
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
    UseOutsideClick(dropdownRef, () => setShowDropdown(false));

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
        <div className="bg-gray-100 rounded-lg shadow-md p-4 flex justify-between items-center mb-4 ml-2 md:ml-6 mr-3 relative">
            {/* Left Section */}
            <div className="grid space-y-2">
                <div className="grid">
                    <div className="flex">
                        {/* QR Code Icon */}
                        {qrCode && (
                            <div className="absolute top-4 left-4 cursor-pointer" onClick={handleQrIconClick}>
                                <img src={qrIcon} alt="QR Icon" className="h-9 w-9"/>
                            </div>
                        )}
                        {/* Shortened URL */}
                        <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-1 ml-12">
                            {shortenedUrl}
                        </a>

                            <img src={copyIcon} className="h-5 w-5 cursor-pointer mt-1.5 ml-6" alt="Copy Icon" onClick={handleCopy}/>
                    </div>

                    {/* Original URL */}
                    <a href={originalUrl} target="_blank" rel="noopener noreferrer"
                       className="text-gray-800 font-semibold mt-3 ml-1 truncate">
                        {trimmedUrl}
                    </a>
                </div>
                <div className="flex space-x-4">
                    <div className="flex items-center">
                        <img src={graphIcon} alt="Graph Icon" className="mr-1"/>
                        <Link to={`/analytics/${shortenedUrl}`} className="text-sm text-gray-700">
                            {totalClicks}
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <img src={calendarIcon} alt="Calendar Icon" className="mr-1"/>
                        <p className="text-sm text-gray-700">{date}</p>
                    </div>
                </div>
            </div>

            {/* Right Section - Three Dot Menu */}
            <div ref={dropdownRef} className="relative sm:ml-2" >
                <button onClick={toggleDropdown} className="focus:outline-none">
                    <img src={threeDotsIcon} alt="More Options" className="h-6 w-6" />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div ref={dropDownDirection} className={`absolute right-0 w-40 bg-white rounded-lg shadow-lg z-10 border-2 border-gray-200 ${
                        isDropdownUpward ? "bottom-full" : "top-full"
                    }`}>
                        <div className="flex items-center justify-start px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleCopy}>
                            <img src={copyIcon} className="h-5 w-5 mr-2" alt="Copy Icon"/>
                            <button className="text-sm">Copy</button>
                        </div>
                        <hr className="border-t border-gray-200"/>
                        <div className="flex items-center justify-start px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleShareModalClick}>
                            <img src={shareIcon} className="h-5 w-5 mr-2" alt="Share Icon"/>
                            <button className="text-sm">Share</button>
                        </div>
                        <hr className="border-t border-gray-200"/>
                        <div className="flex items-center justify-start px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleEditClick}>
                            <img src={editIcon} className="h-5 w-5 mr-2" alt="Edit Icon"/>
                            <button className="text-sm">Edit</button>
                        </div>
                        <hr className="border-t border-gray-200"/>
                        <div className="flex items-center justify-start px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleDeleteClick}>
                            <img src={deleteIcon} className="h-5 w-5 mr-2" alt="Delete Icon"/>
                            <button className="text-sm">Delete</button>
                        </div>
                    </div>
                )}
            </div>

            <EditLink
                isOpen={isEditModalOpen}
                onClose={handleModalClose}
                link={{ originalUrl, shortUrlId: shortenedUrl }}
                onEditSuccess={onEditSuccess}
            />

            {isShareModalOpen && <ShareButton linkToShare={fullUrl} isModalOpen={isShareModalOpen} onClose={handleShareModalClose} />}
            {/* QR Code Popup */}
            {showPopup && <QRCodePopup qrCode={qrCode} onClose={() => setShowPopup(false)} shortUrl={shortenedUrl} />}
        </div>
    );
};

export default LinkCard;
