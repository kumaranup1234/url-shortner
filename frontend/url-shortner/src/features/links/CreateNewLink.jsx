import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createUrl } from '../../store/slices/urlSlice';
import { addNotification } from '../../store/slices/uiSlice';
import Button from '../../shared/components/ui/Button';
import Input from '../../shared/components/ui/Input';

const CreateNewLink = ({ onSuccess }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!originalUrl.trim()) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please enter a URL'
            }));
            return;
        }

        // Basic URL validation
        const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/.*)?$/;
        if (!urlPattern.test(originalUrl)) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please enter a valid URL'
            }));
            return;
        }

        setLoading(true);
        try {
            const result = await dispatch(createUrl({ originalUrl }));
            if (createUrl.fulfilled.match(result)) {
                setOriginalUrl("");
                onSuccess?.();
                dispatch(addNotification({
                    type: 'success',
                    message: 'Short URL created successfully!'
                }));
            } else {
                dispatch(addNotification({
                    type: 'error',
                    message: result.payload || 'Failed to create short URL'
                }));
            }
        } catch (error) {
            dispatch(addNotification({
                type: 'error',
                message: 'Failed to create short URL'
            }));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Shorten a long URL</h2>
                <p className="text-gray-600 dark:text-gray-400 transition-colors">Paste your long URL below to create a short link</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                    <Input
                        type="url"
                        placeholder="https://example.com/my-very-long-url"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        fullWidth
                        size="lg"
                        leftIcon={
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        }
                    />
                </div>

                <Button
                    type="submit"
                    loading={loading}
                    size="lg"
                    className="sm:w-auto w-full px-8"
                >
                    Shorten URL
                </Button>
            </form>
        </div>
    )
}

export default CreateNewLink;
