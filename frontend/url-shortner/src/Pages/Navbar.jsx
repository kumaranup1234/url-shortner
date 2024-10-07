import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { authState } from "../recoil/atoms.js";
import { useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import LogoutButton from "../Components/LogoutButton.jsx";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { isLoggedIn } = useRecoilValue(authState);
    const setAuthState = useSetRecoilState(authState);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleDropdownLinkClick = (path) => {
        setShowDropdown(false);
        navigate(path);
    };

    return (
        <nav className="bg-teal-900 p-5 flex items-center justify-between shadow-md">
            {/* Left: Logo */}
            <div className="flex items-center space-x-6 ml-16">
                <div className="text-white font-bold text-3xl">T.LY</div>
                {isLoggedIn && (
                    <div className="hidden md:flex space-x-4">
                        <NavLink
                            to="/links"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-300 font-bold" : "text-white hover:text-gray-300 font-medium"
                            }
                        >
                            Your Links
                        </NavLink>
                        <NavLink
                            to="/docs"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-300 font-bold" : "text-white hover:text-gray-300 font-medium"
                            }
                        >
                            API Docs
                        </NavLink>
                    </div>
                )}
            </div>

            {/* Right: Buttons/Profile */}
            <div className="flex items-center space-x-6 mr-14">
                {!isLoggedIn ? (
                    <div className="flex space-x-6">
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-300 font-bold text-xl" : "text-white hover:text-gray-300 text-xl"
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-300 font-bold text-xl" : "text-white hover:text-gray-300 text-xl"
                            }
                        >
                            SignUp
                        </NavLink>
                    </div>
                ) : (
                    <div className="relative flex items-center text-white">
                        <FaUserCircle
                            className="w-10 h-9 mr-2 cursor-pointer"
                            onClick={toggleDropdown}
                        />
                        {showDropdown && (
                            <div className="absolute right-2 mt-36 w-40 bg-white shadow-lg rounded py-2">
                                {/* Dropdown Menu */}
                                <NavLink
                                    to="/settings"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleDropdownLinkClick("/settings")}
                                >
                                    <FaCog className="mr-2" /> Settings
                                </NavLink>
                                <hr className="border-t border-gray-200" /> {/* Horizontal Line */}
                                <LogoutButton setShowDropdown={setShowDropdown} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
