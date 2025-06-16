import shareIcon from "../assets/shareIcon.svg";
import editIcon from "../assets/editIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import stats from "../assets/stats.svg";
import calendar from "../assets/calendarIcon.svg";
import eye from "../assets/eyeIcon.svg";
import React, {useState} from "react";
import OneLinkSkeleton from "../Components/OneLinkSkeleton.jsx";
import {useNavigate} from "react-router-dom";
import ShareButton from "../Components/ShareButton.jsx";

const OneLinkCard = ({ oneLinkUrl, clicks, views, createdAt, data, onDelete}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);

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
    const navigate = useNavigate();
    return (
        <>
            <div className="bg-gray-100 max-w-3xl p-6 rounded-lg flex space-x-4">
                <div className="flex-shrink-0">
                    <OneLinkSkeleton/>
                </div>
                <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between w-full ml-2">
                        <a href={oneLinkUrl} target="_blank" rel="noopener noreferrer"
                           className="font-bold text-lg underline hover:underline">
                            {oneLinkUrl}
                        </a>
                        <div className="flex space-x-4">
                            <button
                                className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition"
                            onClick={handleShareModalClick}>
                                <img src={shareIcon} alt="Edit" className="h-5 w-5"/>
                                <span>Share</span>
                            </button>
                            <button
                                className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition"
                                onClick={() => navigate(`/customize-template?username=${data.username}&templateId=${data.templateId}`)}>
                                <img src={editIcon} alt="Edit" className="h-5 w-5"/>
                                <span>Edit</span>
                            </button>
                            <button
                                className="flex items-center space-x-2 p-2 rounded bg-gray-200 text-gray-600 hover:text-gray-800 transition"
                                onClick={handleDeleteClick}>
                                <img src={deleteIcon} alt="Edit" className="h-5 w-5"/>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                    <div className="mt-5 ml-2">
                        <p className="flex items-center space-x-1 rounded">
                            <img src={calendar} alt="Edit" className="h-5 w-5"/>
                            <span>{createdAt}</span>
                        </p>
                        <div className="flex space-x-12 mt-5">
                            <p className="flex items-center space-x-1 rounded">
                                <img src={eye} alt="Edit" className="h-5 w-5"/>
                                <span>{views} views</span>
                            </p>
                            {/**<p className="flex items-center space-x-1 rounded">
                                <img src={stats} alt="Edit" className="h-4 w-5"/>
                                <span>{clicks} clicks</span>
                            </p>**/}
                        </div>
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Delete Link
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this link? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition"
                            >
                                Delete
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