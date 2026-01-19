import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import ProfileSettings from "../features/settings/ProfileSettings";
import SecuritySettings from "../features/settings/SecuritySettings";
import ApiSettings from "../features/settings/ApiSettings";
import Footer from "../shared/components/Footer";
import MainFooter from "../shared/components/MainFooter";
import apiIcon from "../assets/icons8-rest-api.svg";
import securityIcon from "../assets/icons8-secure.svg";
import accountIcon from "../assets/icons8-test-account.svg";

const componentMap = {
    profile: {
        component: ProfileSettings,
        icon: accountIcon,
    },
    security: {
        component: SecuritySettings,
        icon: securityIcon,
    },
    api: {
        component: ApiSettings,
        icon: apiIcon,
    },
};

const Settings = () => {
    const [activeOption, setActiveOption] = useState("profile");
    const ActiveComponent = componentMap[activeOption].component;

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar / Menu */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b border-gray-100">
                                <h2 className="font-semibold text-gray-900">Settings</h2>
                            </div>
                            <nav className="p-2 space-y-1">
                                {Object.keys(componentMap).map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setActiveOption(option)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeOption === option
                                                ? "bg-blue-50 text-blue-700"
                                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                            }`}
                                    >
                                        <img
                                            src={componentMap[option].icon}
                                            alt=""
                                            className={`w-5 h-5 ${activeOption === option ? "opacity-100" : "opacity-70"}`}
                                        />
                                        <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                                {activeOption.charAt(0).toUpperCase() + activeOption.slice(1)} Settings
                            </h2>
                            <ActiveComponent />
                        </div>
                    </div>
                </div>
            </div>
            {/* Footers are handled globally or can be added here if specific to layout. 
                Original file had Footer/MainFooter inside. 
                Ideally, these should be in a global layout wrapper, 
                but I'll leave them out since the user wants a Dashboard feel (which doesn't usually have a big footer)
                or re-add them if requested.*/}
        </div>
    );
};

export default Settings;
