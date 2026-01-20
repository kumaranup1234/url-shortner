import React from "react";
import { FaHeart } from "react-icons/fa";

const LayoutMain6 = ({
    username,
    name,
    bio,
    profilePhoto,
    links = [],
}) => {
    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 relative overflow-hidden font-serif">

            {/* Large Scale Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-purple-100 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-orange-100 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] bg-pink-100 rounded-full blur-[100px] opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-lg">

                {/* Main Card */}
                <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[3rem] p-10 sm:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)]">

                    {/* Header */}
                    <div className="flex flex-col items-center mb-12">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-orange-200 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <img
                                src={profilePhoto}
                                alt="Profile"
                                className="relative w-32 h-32 rounded-full object-cover shadow-sm bg-white p-1 ring-1 ring-gray-100"
                            />
                        </div>

                        <div className="mt-8 text-center">
                            <h1 className="text-3xl sm:text-4xl font-medium text-gray-800 tracking-tight mb-2">
                                {name}
                            </h1>
                            <p className="text-xs font-sans font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">
                                @{username}
                            </p>
                            <div className="text-center max-w-xs mx-auto">
                                <span className="inline-block w-6 h-[1px] bg-gray-300 align-middle mr-2"></span>
                                <span className="text-gray-500 italic font-light"> About </span>
                                <span className="inline-block w-6 h-[1px] bg-gray-300 align-middle ml-2"></span>
                            </div>
                            <p className="mt-4 text-gray-600 font-light leading-relaxed text-lg">
                                {bio}
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col space-y-5">
                        {links?.slice(0, 5).map((link, i) => (
                            <a
                                key={i}
                                href={link.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden bg-white/60 hover:bg-white/90 border border-white rounded-2xl p-4 sm:p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 flex items-center justify-between px-2">
                                    <span className="text-gray-700 font-medium tracking-wide group-hover:text-gray-900 transition-colors">
                                        {link.label || `Link ${i + 1}`}
                                    </span>
                                    <span className="text-gray-300 group-hover:text-gray-500 transition-colors text-sm">
                                        Explore
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-12 flex justify-center text-gray-300 gap-2 items-center text-xs tracking-widest uppercase font-sans">
                        <span>Made with</span>
                        <FaHeart className="text-red-200 animate-pulse" />
                        <span>OneLink</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutMain6;
