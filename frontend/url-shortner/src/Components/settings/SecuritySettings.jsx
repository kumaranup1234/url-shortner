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
            })

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
        <div className="h-screen">
            <div className="mt-10 bg-gray-100 mr-24 w-10/12">
                <div className="flex mb-4 bg-teal-900 text-white p-4">
                    <p className="text-white text-center">Update password</p>
                </div>
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Current Password */}
                        <div className="grid grid-cols-4 gap-4 items-center">
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
                        <div className="grid grid-cols-4 gap-4 items-center">
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
                        <div className="grid grid-cols-4 gap-4 items-center">
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

                        {/* Update button */}
                        <div className="grid grid-cols-4 gap-4 items-center">
                            <div></div> {/* Empty div for alignment */}
                            <button
                                type="submit"
                                className="bg-teal-900 text-white rounded-md p-2 border border-gray-300 w-1/2"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
