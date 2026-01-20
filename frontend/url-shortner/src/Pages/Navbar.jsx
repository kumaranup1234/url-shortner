import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import Logo from "../shared/components/ui/Logo";
import { FaBars, FaTimes, FaUserCircle, FaChevronDown, FaCog, FaSignOutAlt, FaChartBar, FaLink, FaMagic, FaHome } from 'react-icons/fa';
import NotificationBell from "../shared/components/ui/NotificationBell";
import LogoutButton from "../features/auth/LogoutButton.jsx";
import useOutsideClick from "../shared/hooks/useOutsideClick.js";
import hamburger from "../assets/hamburger-menu.svg";
import close from "../assets/close-button.svg";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { isLoggedIn, user } = useSelector(state => state.auth);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const location = useLocation();

    // Check if we are on the landing page
    const isLandingPage = location.pathname === "/";

    // Navbar classes - Logic restored to handle Landing Page vs App Pages
    const navbarClasses = `
        top-0 left-0 right-0 z-50 transition-all duration-300
        ${isLandingPage
            ? `fixed ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm py-2" : "bg-transparent py-4 border-b border-transparent"}`
            : "sticky bg-white border-b border-gray-100 py-3 shadow-sm" // Sticky for dashboard so it stays visible but doesn't overlap content
        }
    `;

    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const handleDropdownLinkClick = (path) => {
        setShowDropdown(false);
        navigate(path);
    };
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

    const handleLogoClick = () => {
        navigate(isLoggedIn ? "/dashboard" : "/");
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
                `transition-all duration-200 ${isActive
                    ? "text-blue-600 font-bold"
                    : "text-gray-600 hover:text-gray-900"
                } ${mobile ? "text-xl py-2 block text-center text-gray-900" : "text-sm font-semibold tracking-wide"}`
            }
        >
            {label}
        </NavLink>
    );

    return (
        <nav className={navbarClasses}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">
                    {/* Left: Logo and Navigation */}
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Toggle menu"
                            >
                                <img
                                    src={showMobileMenu ? close : hamburger}
                                    alt={showMobileMenu ? "Close menu" : "Open menu"}
                                    className="w-5 h-5 opacity-80"
                                />
                            </button>

                            <button
                                onClick={handleLogoClick}
                                className="font-extrabold text-2xl tracking-tight flex items-center gap-3 group"
                            >
                                {/* Logo Icon */}
                                <div className="relative w-9 h-9">
                                    <div className="absolute inset-0 bg-blue-600 rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-20"></div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:-translate-y-0.5">
                                        <svg className="w-5 h-5 text-white transform group-hover:-rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Logo Text */}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                                    Trim<span className="text-blue-600 group-hover:text-indigo-600 transition-colors">.URL</span>
                                </span>
                            </button>
                        </div>

                        {isLoggedIn && (
                            <div className="hidden md:flex space-x-8">
                                {navLinks.map(link => (
                                    <NavLinkComponent key={link.to} {...link} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Profile/Auth */}
                    <div className="flex items-center space-x-4">
                        {!isLoggedIn ? (
                            <div className="hidden md:flex items-center space-x-4">
                                <NavLink to="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Login</NavLink>
                                <NavLink to="/signup" className="text-sm font-bold bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-black transition-all shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30">Sign Up</NavLink>
                            </div>
                        ) : (
                            <div ref={dropdownRef} className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
                                    aria-label="User menu"
                                >
                                    {user?.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100"
                                        />
                                    ) : (
                                        <FaUserCircle className="w-8 h-8 text-gray-400" />
                                    )}
                                    <span className="hidden sm:block font-medium text-sm">
                                        {user?.username}
                                    </span>
                                    <svg className={`w-3 h-3 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 z-50 ring-1 ring-black ring-opacity-5 transform origin-top-right transition-all">
                                        <div className="px-4 py-3 border-b border-gray-50">
                                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Signed in as</p>
                                            <p className="text-sm font-bold text-gray-900 truncate">{user?.email}</p>
                                        </div>
                                        <div className="py-1">
                                            <button
                                                onClick={() => handleDropdownLinkClick("/settings")}
                                                className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                            >
                                                <FaCog className="mr-3 text-gray-400 group-hover:text-blue-500" />
                                                Settings
                                            </button>
                                        </div>
                                        <div className="my-1 border-t border-gray-100"></div>
                                        <LogoutButton setShowDropdown={setShowDropdown} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {
                showMobileMenu && (
                    <div className="md:hidden fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col pt-24 px-6 space-y-6 animate-fadeIn">
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
                )
            }
        </nav >
    );
};

export default Navbar;
