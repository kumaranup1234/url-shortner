import React from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from "react-icons/fa";

const LayoutMain4 = ({
    username,
    name,
    bio,
    profilePhoto,
    links = [],
}) => {
    return (
        <div className="min-h-screen bg-gray-950 text-white font-mono flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md">

                {/* Main Card */}
                <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors duration-500">

                    {/* Glowing Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

                    {/* Profile Header */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="relative mb-6">
                            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur opacity-70 animate-pulse"></div>
                            <img
                                src={profilePhoto}
                                alt="Profile"
                                className="relative w-28 h-28 rounded-full object-cover border-4 border-gray-900 bg-gray-800"
                            />
                            <div className="absolute bottom-0 right-0 bg-gray-900 text-cyan-400 text-[10px] px-2 py-0.5 rounded border border-cyan-500/50 uppercase tracking-wider">
                                2077
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tighter text-white mb-3">
                            {name}
                        </h1>
                        <p className="text-gray-400 text-center leading-relaxed text-sm max-w-xs border-l-2 border-cyan-500/50 pl-4 py-1">
                            {bio}
                        </p>
                        {username && (
                            <div className="mt-4 px-3 py-1 bg-white/5 rounded-full text-xs text-gray-500 font-bold tracking-widest uppercase">
                                @{username}
                            </div>
                        )}
                    </div>

                    {/* Links Grid */}
                    <div className="space-y-4">
                        {links?.slice(0, 5).map((link, i) => (
                            <a
                                key={i}
                                href={link.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full bg-gray-800/40 hover:bg-gray-800/80 border border-white/5 hover:border-cyan-500/50 rounded-lg p-4 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:-translate-y-0.5"
                            >
                                <span className="text-gray-300 group-hover:text-cyan-400 font-medium tracking-wide transition-colors">
                                    {link.label || `Link ${i + 1}`}
                                </span>
                                <div className="text-gray-600 group-hover:text-cyan-400 transition-colors transform group-hover:translate-x-1">
                                    →
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Social Footer */}
                    <div className="mt-12 pt-6 border-t border-white/5 flex justify-center gap-8">
                        <a href="#" className="text-gray-500 hover:text-white hover:scale-110 transition-all"><FaGithub size={20} /></a>
                        <a href="#" className="text-gray-500 hover:text-cyan-400 hover:scale-110 transition-all"><FaTwitter size={20} /></a>
                        <a href="#" className="text-gray-500 hover:text-purple-400 hover:scale-110 transition-all"><FaLinkedin size={20} /></a>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                        Powered by OneLink System_
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LayoutMain4;
