import React from "react";

const LayoutMain3 = ({
                         username,
                         name,
                         bio,
                         profilePhoto,
                         links = [],
                     }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center p-4">
            <div className="relative bg-white
        px-10 py-12 rounded-xl shadow-xl
        w-[90%] sm:w-[85%] md:w-[65%] lg:w-[50%] xl:w-[40%]
        flex flex-col items-center justify-start
        transition-all duration-300 hover:shadow-2xl border border-gray-100">

                {/* Subtle header accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-xl"></div>

                {/* Professional Profile Photo */}
                <div className="relative z-10 mb-8">
                    <img
                        src={profilePhoto}
                        alt="Profile"
                        className="rounded-full w-28 h-28 sm:w-32 sm:h-32 object-cover shadow-lg
                        border-4 border-gray-100 ring-4 ring-blue-50"
                        loading="lazy"
                    />
                </div>

                {/* Professional Profile Info */}
                <div className="relative z-10 text-center mb-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                        {name}
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md mx-auto font-normal">
                        {bio}
                    </p>
                    {username && (
                        <p className="text-sm text-gray-500 mt-3 font-medium">@{username}</p>
                    )}
                </div>

                {/* Professional Links */}
                <div className="relative z-10 w-full flex flex-col space-y-4 items-stretch max-w-md">
                    {links?.slice(0, 5).map((link, index) => (
                        <a
                            key={index}
                            href={link.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between bg-gray-50 hover:bg-blue-50
                            rounded-lg px-6 py-4 text-base font-medium
                            shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-200
                            transition-all duration-200 transform hover:scale-[1.02]"
                        >
                            <span className="text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                                {link.label || `Link ${index + 1}`}
                            </span>

                            {/* Professional arrow icon */}
                            <svg
                                className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    ))}
                </div>

                {/* Subtle footer branding area */}
                <div className="mt-12 pt-6 border-t border-gray-100 w-full">
                    <div className="flex justify-center items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutMain3;