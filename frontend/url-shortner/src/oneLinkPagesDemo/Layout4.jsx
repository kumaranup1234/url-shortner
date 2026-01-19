import React from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from "react-icons/fa";

const Layout4 = ({
    username = "username",
    name = "Cyber User",
    bio = "Building the future in the dark.",
    profilePhoto,
    links = [],
    isClicked = false
}) => {
    return (
        <div className={`relative bg-gray-900 text-white w-[375px] min-h-[600px] mx-auto flex flex-col overflow-hidden font-mono ${isClicked ? "border-blue-500 border-2" : "border-transparent"}`}>
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            {/* Neon Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]"></div>

            <div className="relative z-10 p-6 flex flex-col items-center h-full">

                {/* Profile Section */}
                <div className="relative mb-6 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                        src={profilePhoto || "https://i.imgur.com/vE5Xq7R.png"}
                        alt="Profile"
                        className="relative w-24 h-24 rounded-full object-cover border-2 border-white/50 bg-gray-800"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-black border border-cyan-500 text-cyan-500 text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-widest">
                        Online
                    </div>
                </div>

                <div className="text-center mb-8 space-y-2">
                    <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {name}
                    </h1>
                    <p className="text-xs text-gray-400 max-w-[250px] leading-relaxed border-l-2 border-purple-500 pl-3 text-left mx-auto">
                        {bio}
                    </p>
                    {username && (
                        <div className="inline-block mt-2 px-3 py-1 bg-white/5 rounded border border-white/10 text-[10px] tracking-widest text-gray-300">
                            @{username}
                        </div>
                    )}
                </div>

                {/* Links Section */}
                <div className="w-full space-y-3 flex-1">
                    {(links.length > 0 ? links : [
                        { label: "Documentation", url: "#" },
                        { label: "Source Code", url: "#" },
                        { label: "System Status", url: "#" }
                    ]).slice(0, 5).map((link, i) => (
                        <a
                            key={i}
                            href={link.url || "#"}
                            className="block w-full bg-gray-800/50 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 rounded p-3 text-sm text-center transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <span className="relative z-10 text-gray-200 group-hover:text-cyan-400 font-medium tracking-wide">
                                {link.label || `Link ${i + 1}`}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-8 flex gap-6 text-gray-500">
                    <FaGithub className="hover:text-white transition-colors cursor-pointer" />
                    <FaTwitter className="hover:text-cyan-400 transition-colors cursor-pointer" />
                    <FaLinkedin className="hover:text-purple-400 transition-colors cursor-pointer" />
                    <FaGlobe className="hover:text-green-400 transition-colors cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default Layout4;
