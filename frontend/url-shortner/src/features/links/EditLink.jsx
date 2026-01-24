import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/slices/uiSlice';
import axiosInstance from "../../shared/utils/axiosInstance.js";
import { BASE_URL } from "../../shared/utils/constants.js";
import Button from '../../shared/components/ui/Button';
import Input from '../../shared/components/ui/Input';

const EditLink = ({ isOpen, onClose, link, onEditSuccess }) => {
    const [originalUrl, setOriginalUrl] = useState(link.originalUrl || "");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const fullUrl = `${BASE_URL}/${link.shortUrlId}`;

    useEffect(() => {
        if (isOpen && link) {
            setOriginalUrl(link.originalUrl);
        }
    }, [isOpen, link]);

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (!originalUrl.trim()) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please enter a valid URL'
            }));
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.put(`/api/urls/manage/update/${link.shortUrlId}`, {
                originalUrl: originalUrl.trim()
            });

            if (response.data.success) {
                dispatch(addNotification({
                    type: 'success',
                    message: 'Link updated successfully!'
                }));
                onEditSuccess?.();
                onClose();
            }
        } catch (error) {
            dispatch(addNotification({
                type: 'error',
                message: error.response?.data?.error || 'Failed to update link'
            }));
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-auto border border-transparent dark:border-gray-700">
                <div className="flex justify-between items-center bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 rounded-t-xl">
                    <h2 className="text-xl font-semibold">Edit Link</h2>
                    <button
                        className="text-white hover:text-gray-200 transition-colors p-1"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
                    <Input
                        label="Original URL"
                        type="url"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        placeholder="Enter the updated URL"
                        required
                        fullWidth
                        leftIcon={
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        }
                    />

                    <Input
                        label="Shortened URL"
                        type="text"
                        value={fullUrl}
                        readOnly
                        fullWidth
                        className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400"
                        leftIcon={
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        }
                    />

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Update Link
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLink;