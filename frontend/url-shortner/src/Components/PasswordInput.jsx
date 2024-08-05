import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center bg-gray-50 border-[2px] border-gray-300 px-5 rounded-lg mb-4 focus-within:border-blue-500">
            <input
                value={value}
                onChange={onChange}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                className="w-full text-sm bg-transparent py-3 outline-none focus:ring-0"
            />
            {showPassword ? (
                <FaRegEye
                    size={22}
                    className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                    onClick={toggleShowPassword}
                />
            ) : (
                <FaRegEyeSlash
                    size={22}
                    className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                    onClick={toggleShowPassword}
                />
            )}
        </div>
    );
};

export default PasswordInput;
