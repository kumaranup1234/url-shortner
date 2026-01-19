import { FaUserCircle, FaCog } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutButton from "../Components/LogoutButton.jsx";
import useOutsideClick from "../hooks/useOutsideClick.jsx";
import hamburger from "../assets/hamburger-menu.svg";
import close from "../assets/close-button.svg";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { isLoggedIn, user } = useSelector(state => state.auth);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => setShowDropdown(false));

    useEffect(() => {
        document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showMobileMenu]);

    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const handleDropdownLinkClick = (path) => {
        setShowDropdown(false);
        navigate(path);
    };
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

    const handleLogoClick = () => {
        navigate(isLoggedIn ? "/links" : "/");
    };

    const navLinks = [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/links", label: "Your Links" },
        { to: "/onelinkPages", label: "OneLink" },
        { to: "/api-docs", label: "API Docs" }
    ];

    const authLinks = [
        { to: "/login", label: "Login" },
        { to: "/signup", label: "Sign Up" }
    ];

    const NavLinkComponent = ({ to, label, onClick, mobile = false }) => (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `transition-colors duration-200 ${
                    isActive
                        ? "text-yellow-300 font-bold"
                        : "text-white hover:text-yellow-200"
                } ${mobile ? "text-xl py-2" : "font-medium"}`
            }
        >
            {label}
        </NavLink>
    );

    return (
        <nav className="bg-gradient-to-r from-teal-800 to-teal-900 shadow-lg relative z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Logo and Navigation */}
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 rounded-md text-white hover:bg-teal-700 transition-colors"
                                aria-label="Toggle menu"
                            >
                                <img
                                    src={showMobileMenu ? close : hamburger}
                                    alt={showMobileMenu ? "Close menu" : "Open menu"}
                                    className="w-5 h-5"
                                />
                            </button>
                            
                            <button
                                onClick={handleLogoClick}
                                className="text-white font-bold text-2xl hover:text-yellow-200 transition-colors"
                            >
                                Trim.URL
                            </button>
                        </div>

                        {isLoggedIn && (
                            <div className="hidden md:flex space-x-6">
                                {navLinks.map(link => (
                                    <NavLinkComponent key={link.to} {...link} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Profile/Auth */}
                    <div className="flex items-center">
                        {!isLoggedIn ? (
                            <div className="hidden md:flex space-x-6">
                                {authLinks.map(link => (
                                    <NavLinkComponent key={link.to} {...link} />
                                ))}
                            </div>
                        ) : (
                            <div ref={dropdownRef} className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-2 text-white hover:text-yellow-200 transition-colors p-2 rounded-md hover:bg-teal-700"
                                    aria-label="User menu"
                                >
                                    {user?.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <FaUserCircle className="w-8 h-8" />
                                    )}
                                    <span className="hidden sm:block font-medium">
                                        {user?.username}
                                    </span>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                                        <button
                                            onClick={() => handleDropdownLinkClick("/settings")}
                                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            <FaCog className="mr-3 text-gray-400" />
                                            Settings
                                        </button>
                                        <hr className="my-1 border-gray-200" />
                                        <LogoutButton setShowDropdown={setShowDropdown} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-teal-900 shadow-xl z-50">
                    <div className="px-4 py-6 space-y-4">
                        {isLoggedIn ? (
                            navLinks.map(link => (
                                <NavLinkComponent
                                    key={link.to}
                                    {...link}
                                    onClick={toggleMobileMenu}
                                    mobile
                                />
                            ))
                        ) : (
                            authLinks.map(link => (
                                <NavLinkComponent
                                    key={link.to}
                                    {...link}
                                    onClick={toggleMobileMenu}
                                    mobile
                                />
                            ))
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
