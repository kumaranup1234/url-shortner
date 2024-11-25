import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../recoil/atoms.js";
import { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutButton from "../Components/LogoutButton.jsx";
import useOutsideClick from "../hooks/useOutsideClick.jsx";
import hamburger from "../assets/hamburger-menu.svg";
import close from "../assets/close-button.svg";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { isLoggedIn, user } = useRecoilValue(authState);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // custom hook for outside click detection
    useOutsideClick(dropdownRef, () => setShowDropdown(false));

    // Disable scrolling when the mobile menu is open
    useEffect(() => {
        if (showMobileMenu) {
            document.body.style.overflow = "hidden"; // disable scrolling
        } else {
            document.body.style.overflow = "auto"; // re-enable scrolling
        }
        return () => {
            document.body.style.overflow = "auto"; // re-enable scrolling on cleanup
        };
    }, [showMobileMenu]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleDropdownLinkClick = (path) => {
        setShowDropdown(false);
        navigate(path);
    };
    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const handleLogoClick = () => {
        if (isLoggedIn) {
            navigate("/links");
        } else {
            navigate("/");
        }
    };

    return (
        <nav className="bg-teal-900 p-5 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-6 ml-4 md:ml-16">
                <div className="flex justify-between items-center space-x-6">
                    {!showMobileMenu ? (
                        <img
                            src={hamburger}
                            alt="Hamburger Menu"
                            className="cursor-pointer md:hidden w-6 h-6"
                            onClick={toggleMobileMenu}
                        />
                    ) : (
                        <img
                            src={close}
                            alt="Close Menu"
                            className="cursor-pointer md:hidden h-6 w-6"
                            onClick={toggleMobileMenu}
                        />
                    )}
                <div
                    onClick={handleLogoClick}
                    className="text-white font-bold text-2xl cursor-pointer"
                >
                    Trim.URL
                </div>
                </div>

                {isLoggedIn && (
                    <div className="hidden md:flex space-x-4">
                        <NavLink
                            to="/dashboard"
                            className={({isActive}) =>
                                isActive
                                    ? "text-yellow-300 font-bold"
                                    : "text-white hover:text-gray-300 font-medium"
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/links"
                            className={({isActive}) =>
                                isActive
                                    ? "text-yellow-300 font-bold"
                                    : "text-white hover:text-gray-300 font-medium"
                            }
                        >
                            Your Links
                        </NavLink>
                        <NavLink
                            to="/onelinkPages"
                            className={({isActive}) =>
                                isActive
                                    ? "text-yellow-300 font-bold"
                                    : "text-white hover:text-gray-300 font-medium"
                            }
                        >
                            OneLink
                        </NavLink>
                        <NavLink
                            to="/api-docs"
                            className={({isActive}) =>
                                isActive
                                    ? "text-yellow-300 font-bold"
                                    : "text-white hover:text-gray-300 font-medium"
                            }
                        >
                            API Docs
                        </NavLink>
                    </div>
                )}
            </div>

            {/* Right: Buttons/Profile */}
            <div className="flex items-center space-x-6 md:mr-14">
                {!isLoggedIn ? (
                    <div className="space-x-6 hidden md:block ">
                    <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-yellow-300 font-bold text-xl"
                                    : "text-white hover:text-gray-300 text-xl"
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-yellow-300 font-bold text-xl"
                                    : "text-white hover:text-gray-300 text-xl"
                            }
                        >
                            SignUp
                        </NavLink>
                    </div>
                ) : (
                    <div ref={dropdownRef} className="flex md:space-x-2 items-center text-white" onClick={toggleDropdown}>
                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt="User Profile"
                                className="w-10 h-9 rounded-full lg:mr-2 cursor-pointer"
                            />
                        ) : (
                            <FaUserCircle
                                className="w-10 h-9 lg:mr-2 cursor-pointer"
                            />
                        )}
                        <h1 className="cursor-pointer hidden sm:block">{user.username}</h1>
                        {showDropdown && (
                            <div className="absolute right-8 md:right-28 mt-36 w-40 bg-white shadow-lg rounded py-2">
                                {/* Dropdown Menu */}
                                <NavLink
                                    to="/settings"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleDropdownLinkClick("/settings")}
                                >
                                    <FaCog className="mr-2"/> Settings
                                </NavLink>
                                <hr className="border-t border-gray-200"/>
                                {/* Horizontal Line */}
                                <LogoutButton setShowDropdown={setShowDropdown}/>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showMobileMenu && (
                <div className="absolute top-16 mt-2 left-0 w-full h-[calc(100%-4rem)] bg-teal-950 bg-opacity-50 z-50 flex flex-col justify-center items-center md:hidden">
                    {isLoggedIn ? (
                        <div className="flex flex-col text-center space-y-4">
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-yellow-300 font-bold text-2xl"
                                        : "text-white text-xl"
                                }
                                onClick={toggleMobileMenu}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/links"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-yellow-300 font-bold text-2xl"
                                        : "text-white text-xl"
                                }
                                onClick={toggleMobileMenu}
                            >
                                Your Links
                            </NavLink>
                            <NavLink
                                to="/onelinkPages"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-yellow-300 font-bold text-2xl"
                                        : "text-white text-xl"
                                }
                                onClick={toggleMobileMenu}
                            >
                                OneLink
                            </NavLink>
                            <NavLink
                                to="/api-docs"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-yellow-300 font-bold text-2xl"
                                        : "text-white text-xl"
                                }
                                onClick={toggleMobileMenu}
                            >
                                API Docs
                            </NavLink>
                        </div>
                    ) : (
                        <div className="flex flex-col text-center space-y-4">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-yellow-300 font-bold text-2xl"
                                        : "text-white text-xl"
                                }
                                onClick={toggleMobileMenu}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-yellow-300 font-bold text-2xl"
                                        : "text-white text-xl"
                                }
                                onClick={toggleMobileMenu}
                            >
                                SignUp
                            </NavLink>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
