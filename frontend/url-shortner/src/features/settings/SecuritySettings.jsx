import { useState } from "react";
import { toast } from 'sonner';
import axiosInstance from "../../shared/utils/axiosInstance.js";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const SecuritySettings = () => {
    const [currentPassword, setCurrentPassword] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
    const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const myPromise = axiosInstance.post("/api/users/password-reset", {
                currentPassword: currentPassword,
                newPassword: confirmPassword,
            });

            toast.promise(myPromise, {
                loading: "Resetting password",
                success: "Password reset successfully.",
                error: "Password reset failed",
            });

            // Reset input fields after the promise resolves
            await myPromise;
            setCurrentPassword(""); // Reset to an empty string instead of `null`
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error occurred. Please try again!");
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
                    <h3 className="text-xl font-semibold">Update Password</h3>
                    <p className="text-gray-400 text-sm mt-1">Ensure your account uses a strong password</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Current Password */}
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700 pt-3">
                                Current Password
                            </label>
                            <div className="col-span-2 relative">
                                <input
                                    id="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10"
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter current password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                    onClick={toggleShowCurrentPassword}
                                >
                                    {showCurrentPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700 pt-3">
                                New Password
                            </label>
                            <div className="col-span-2 relative">
                                <input
                                    id="password"
                                    type={showNewPassword ? "text" : "password"}
                                    value={password}
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                    onClick={toggleShowNewPassword}
                                >
                                    {showNewPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 pt-3">
                                Confirm Password
                            </label>
                            <div className="col-span-2 relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                    onClick={toggleShowConfirmPassword}
                                >
                                    {showConfirmPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Update Button */}
                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                className="bg-gray-900 text-white rounded-lg px-6 py-2.5 font-medium hover:bg-black transition-all duration-200 shadow-sm"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
