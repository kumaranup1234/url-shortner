import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../store/slices/uiSlice';
import { validateEmail } from "../../shared/utils/helper.js";
import axiosInstance from "../../shared/utils/axiosInstance.js";
import Button from '../../shared/components/ui/Button';
import Input from '../../shared/components/ui/Input';
import userIcon from "../../assets/icons8-user.svg";

const ProfileSettings = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [email, setEmail] = useState(user?.email || "");
    const [name, setName] = useState(user?.username || "");
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const initialEmail = user?.email || "";
    const initialName = user?.username || "";

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSizeLimit = 2 * 1024 * 1024; // 2MB
            if (file.size > fileSizeLimit) {
                dispatch(addNotification({
                    type: 'error',
                    message: 'File size should not exceed 2MB!'
                }));
                return;
            }
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput?.files[0];

        if (!file) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please select an image first'
            }));
            return;
        }

        const formData = new FormData();
        formData.append("profileImage", file);

        setImageLoading(true);
        try {
            const response = await axiosInstance.post('/api/users/profile-image', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            dispatch(addNotification({
                type: 'success',
                message: 'Profile image updated successfully!'
            }));

            // Update user in auth state would need to be handled here
            setSelectedImage("");
            fileInput.value = "";
        } catch (error) {
            dispatch(addNotification({
                type: 'error',
                message: error.response?.data?.error || 'Error updating profile image'
            }));
        } finally {
            setImageLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name?.trim()) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please enter a valid name!'
            }));
            return;
        }

        if (!validateEmail(email)) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please enter a valid email'
            }));
            return;
        }

        const dataToSend = {};
        if (name !== initialName) dataToSend.username = name;
        if (email !== initialEmail) dataToSend.email = email;

        if (Object.keys(dataToSend).length === 0) {
            dispatch(addNotification({
                type: 'info',
                message: 'No changes detected!'
            }));
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.put('/api/users/profile', dataToSend);
            dispatch(addNotification({
                type: 'success',
                message: 'Profile updated successfully!'
            }));
        } catch (error) {
            dispatch(addNotification({
                type: 'error',
                message: error.response?.data?.error || 'Error updating profile'
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Profile Photo Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 text-white p-6 rounded-t-xl transition-colors">
                    <h2 className="text-xl font-semibold">Profile Photo</h2>
                    <p className="text-gray-400 text-sm mt-1">Update your profile picture</p>
                </div>

                <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="relative">
                            <img
                                src={selectedImage || user?.profileImage || userIcon}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                            />
                            {selectedImage && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 transition-colors"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                        </div>

                        <Button
                            onClick={handleImageUpload}
                            loading={imageLoading}
                            disabled={!selectedImage}
                        >
                            Upload Photo
                        </Button>
                    </div>
                </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 text-white p-6 rounded-t-xl transition-colors">
                    <h2 className="text-xl font-semibold">Contact Information</h2>
                    <p className="text-gray-400 text-sm mt-1">Update your personal details</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <Input
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                        fullWidth
                        leftIcon={
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        }
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        fullWidth
                        leftIcon={
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        }
                    />

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            loading={loading}
                            size="lg"
                        >
                            Update Profile
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSettings;
