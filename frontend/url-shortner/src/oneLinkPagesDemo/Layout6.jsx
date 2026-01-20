import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";

const Layout6 = ({
    username = "username",
    name = "Serene Space",
    bio = "Breathe in, breathe out.",
    profilePhoto,
    links = [],
    isClicked = false
}) => {
    return (
        <div className={`relative bg-[#F9FAFB] w-[375px] min-h-[600px] mx-auto flex flex-col font-serif overflow-hidden ${isClicked ? "border-blue-500 border-2" : "border-transparent"}`}>

            {/* Animated Soft Backgrounds */}
            <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-purple-200 rounded-full blur-[80px] opacity-40"></div>
            <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-orange-200 rounded-full blur-[80px] opacity-40"></div>
            <div className="absolute top-[40%] left-[30%] w-48 h-48 bg-pink-200 rounded-full blur-[60px] opacity-30"></div>

            <div className="relative z-10 p-8 flex flex-col items-center h-full">

                {/* Profile */}
                <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-white/50 rounded-full blur-xl transform scale-110"></div>
                    <img
                        src={profilePhoto || "https://i.imgur.com/vE5Xq7R.png"}
                        alt="Profile"
                        className="relative w-24 h-24 rounded-full object-cover shadow-sm ring-4 ring-white"
                    />
                </div>

                <div className="text-center mb-10 space-y-1">
                    <h1 className="text-2xl font-serif font-medium text-gray-800 tracking-tight">
                        {name}
                    </h1>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                        @{username}
                    </p>
                    <div className="w-8 h-[1px] bg-gray-300 mx-auto my-3"></div>
                    <p className="text-sm text-gray-600 font-light italic max-w-[200px] leading-relaxed mx-auto">
                        {bio}
                    </p>
                </div>

                {/* Links */}
                <div className="w-full space-y-4 flex-1">
                    {(links.length > 0 ? links : [
                        { label: "Journal", url: "#" },
                        { label: "Gallery", url: "#" },
                        { label: "Contact", url: "#" }
                    ]).slice(0, 5).map((link, i) => (
                        <a
                            key={i}
                            href={link.url || "#"}
                            className="block w-full bg-white/40 hover:bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3 text-center transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 group"
                        >
                            <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                                {link.label || `Link ${i + 1}`}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Footer Icon */}
                <div className="mt-8 text-gray-300">
                    <FaHeart size={12} />
                </div>
            </div>
        </div>
    );
};

export default Layout6;
