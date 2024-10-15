import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { authState } from "../recoil/atoms.js";
import {useRef, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import LogoutButton from "../Components/LogoutButton.jsx";
import useOutsideClick from "../hooks/useOutsideClick.jsx";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { isLoggedIn, user } = useRecoilValue(authState);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // custom hook for outside click detection
    useOutsideClick(dropdownRef, () => setShowDropdown(false));

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleDropdownLinkClick = (path) => {
        setShowDropdown(false);
        navigate(path);
    };

    const handleLogoClick = () => {
        if (isLoggedIn){
            navigate("/links");
        }else{
            navigate("/");
        }
    }

    return (
        <nav className="bg-teal-900 p-5 flex items-center justify-between shadow-md">
            {/* Left: Logo */}
            <div className="flex items-center space-x-6 ml-16">
                <div onClick={handleLogoClick} className="text-white font-bold text-2xl cursor-pointer">Trim.URL</div>
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
                            to="/api-docs"
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
                    <div ref={dropdownRef} className="relative flex items-center text-white" onClick={toggleDropdown}>
                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt="User Profile"
                                className="w-10 h-9 rounded-full mr-2 cursor-pointer"
                            />
                        ) : (
                            <FaUserCircle
                                className="w-10 h-9 mr-2 cursor-pointer"
                            />
                        )}
                        <h1 className="cursor-pointer">{user.username}</h1>
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
