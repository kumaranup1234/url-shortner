import ApiSettings from "../Components/settings/ApiSettings.jsx";
import SecuritySettings from "../Components/settings/SecuritySettings.jsx";
import ProfileSettings from "../Components/settings/ProfileSettings.jsx";
import { useState } from "react";
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
        <div className="flex flex-col lg:flex-row justify-between w-full">
            {/* Options Menu */}
            <div className="w-full lg:w-auto flex flex-col lg:ml-24 mt-4 lg:mt-0">
                <p className="text-center text-lg font-medium lg:text-left lg:mt-4">Settings</p>
                <div className="flex lg:flex-col justify-center space-x-4 lg:space-x-0 lg:space-y-3 mt-4">
                    {Object.keys(componentMap).map((option) => (
                        <button
                            key={option}
                            className={`flex items-center space-x-2 p-2 rounded ${
                                activeOption === option
                                    ? `bg-teal-600 text-white`
                                    : `bg-gray-200 text-black`
                            }`}
                            onClick={() => setActiveOption(option)}
                        >
                            <img
                                src={componentMap[option].icon}
                                alt={`${option} icon`}
                                className="w-6 h-6"
                            />
                            <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Rendered Component */}
            <div className="flex-grow p-4 w-full lg:w-auto mt-6 lg:mt-0">
                <ActiveComponent />
            </div>
        </div>
    );
};

export default Settings;
