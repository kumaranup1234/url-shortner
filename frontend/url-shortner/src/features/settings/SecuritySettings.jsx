import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance.js";
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
        <div className="h-screen flex justify-center items-start py-10 px-4">
            <div className="bg-gray-100 w-full max-w-4xl rounded-md shadow-lg">
                {/* Header */}
                <div className="flex justify-center mb-4 bg-teal-900 text-white p-4 rounded-t-md">
                    <p className="text-lg font-semibold">Update Password</p>
                </div>

                {/* Form */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Current Password */}
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                            <label htmlFor="currentPassword" className="text-sm font-semibold">
                                Current Password
                            </label>
                            <div className="col-span-3 flex items-center bg-gray-50 border-[2px] border-gray-300 px-5 rounded-lg">
                                <input
                                    id="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    className="w-full text-sm bg-transparent py-3 outline-none"
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Current Password"
                                />
                                {showCurrentPassword ? (
                                    <FaRegEye
                                        size={22}
                                        className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                                        onClick={toggleShowCurrentPassword}
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        size={22}
                                        className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                                        onClick={toggleShowCurrentPassword}
                                    />
                                )}
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                            <label htmlFor="password" className="text-sm font-semibold">
                                New Password
                            </label>
                            <div className="col-span-3 flex items-center bg-gray-50 border-[2px] border-gray-300 px-5 rounded-lg">
                                <input
                                    id="password"
                                    type={showNewPassword ? "text" : "password"}
                                    value={password}
                                    className="w-full text-sm bg-transparent py-3 outline-none"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="New Password"
                                />
                                {showNewPassword ? (
                                    <FaRegEye
                                        size={22}
                                        className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                                        onClick={toggleShowNewPassword}
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        size={22}
                                        className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                                        onClick={toggleShowNewPassword}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                            <label htmlFor="confirmPassword" className="text-sm font-semibold">
                                Confirm Password
                            </label>
                            <div className="col-span-3 flex items-center bg-gray-50 border-[2px] border-gray-300 px-5 rounded-lg">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    className="w-full text-sm bg-transparent py-3 outline-none"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                />
                                {showConfirmPassword ? (
                                    <FaRegEye
                                        size={22}
                                        className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                                        onClick={toggleShowConfirmPassword}
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        size={22}
                                        className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                                        onClick={toggleShowConfirmPassword}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Update Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-teal-900 text-white rounded-md px-5 py-2 border border-gray-300 hover:bg-teal-800 transition-all duration-200"
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
