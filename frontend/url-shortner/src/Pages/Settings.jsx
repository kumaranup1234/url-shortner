import ApiSettings from "../Components/settings/ApiSettings.jsx";
import SecuritySettings from "../Components/settings/SecuritySettings.jsx";
import ProfileSettings from "../Components/settings/ProfileSettings.jsx";
import { useState } from "react";
import apiIcon from "../assets/icons8-rest-api.svg";
import securityIcon from "../assets/icons8-secure.svg";
import accountIcon from "../assets/icons8-test-account.svg";

const componentMap = {
    'profile': {
        component: ProfileSettings,
        icon: accountIcon,
    },
    'security': {
        component: SecuritySettings,
        icon: securityIcon,
    },
    'api': {
        component: ApiSettings,
        icon: apiIcon,
    },
};

const Settings = () => {
    const [activeOption, setActiveOption] = useState('profile');
    const ActiveComponent = componentMap[activeOption].component;

    return (
        <div className="flex justify-between w-full">
            <div className="ml-24">
                <p className="mt-3">Settings</p>
                <div className="flex flex-col space-y-3 mt-4">
                    {Object.keys(componentMap).map((option) => (
                        <button
                            key={option}
                            className="flex items-center space-x-2"
                            onClick={() => setActiveOption(option)}>
                            <img src={componentMap[option].icon} alt={`${option} icon`}
                                 className="w-6 h-6"/> {/* Render the icon */}
                            <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-grow p-4 ml-56">
                <ActiveComponent/>
            </div>
        </div>
    );
};

export default Settings;
