import { useState } from "react";

const SecuritySettings = () => {
    const [currentPassword, setCurrentPassword] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the password update logic here
    };

    return (
        <div className="h-screen">
            <div className="mt-10 bg-gray-100 mr-24 w-10/12">
                <div className="flex mb-4 bg-teal-900 text-white p-4">
                    <p className="text-white text-center">Update password</p>
                </div>
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Grid layout for uniform alignment */}
                        <div className="grid grid-cols-4 gap-4 items-center">
                            <label htmlFor="currentPassword" className="text-sm font-semibold">
                                Current Password
                            </label>
                            <input
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                className="p-2 border border-gray-300 rounded-md col-span-3"
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4 items-center">
                            <label htmlFor="password" className="text-sm font-semibold">
                                New Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                className="p-2 border border-gray-300 rounded-md col-span-3"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4 items-center">
                            <label htmlFor="confirmPassword" className="text-sm font-semibold">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                className="p-2 border border-gray-300 rounded-md col-span-3"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
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
