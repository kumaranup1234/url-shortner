import React from "react";

const LayoutMain1 = ({
                           username,
                           name,
                           bio,
                           profilePhoto,
                           links = [],
                       }) => {
    const getBioSpacing = (bioText) => {
        if (!bioText || bioText.length < 50) return "mb-4";
        if (bioText.length < 100) return "mb-3";
        return "mb-2";
    };

    return (
        <div className="h-screen bg-gray-50 flex items-center justify-center">
            <div className="relative bg-gradient-to-br from-green-300 via-green-200 to-yellow-100
        px-6 py-6 sm:px-8 md:px-10 rounded-2xl shadow-2xl
        w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[40%]
        flex flex-col items-center justify-start
        transition-all duration-300 hover:scale-[1.02] shadow-gray-300">

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl pointer-events-none"></div>

                {/* Profile Photo */}
                <div className="relative z-10 mb-5">
                    <img
                        src={profilePhoto}
                        alt="Profile"
                        className="rounded-full w-20 h-20 sm:w-24 sm:h-24 object-cover shadow-lg border-4 border-white"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-black/10"></div>
                </div>

                {/* Profile Info */}
                <div className={`relative z-10 text-center ${getBioSpacing(bio)}`}>
                    <h1 className="text-xl sm:text-2xl font-bold font-serif mb-2 text-gray-800 drop-shadow-sm">
                        {name}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-700 px-2 font-medium">
                        {bio}
                    </p>
                    {username && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 font-mono">@{username}</p>
                    )}
                </div>

                {/* Links */}
                <div className="relative z-10 mt-4 w-full flex flex-col space-y-3 items-stretch">
                    {links?.slice(0, 5).map((link, index) => (
                        <a
                            key={index}
                            href={link.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white/90 backdrop-blur-sm rounded-full text-center
                px-4 py-3 text-sm sm:text-base font-semibold
                shadow-lg hover:shadow-xl hover:bg-white
                transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                border border-white/50"
                        >
                            <span className="text-gray-800">{link.label || `Link ${index + 1}`}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LayoutMain1;
