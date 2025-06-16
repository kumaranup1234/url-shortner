import React from "react";

const LayoutMain2 = ({
                         username,
                         name,
                         bio,
                         profilePhoto,
                         links = [],
                     }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-600 flex items-center justify-center p-4">
            <div className="relative bg-black/20 backdrop-blur-xl border border-white/20
        px-8 py-10 rounded-3xl shadow-2xl
        w-[90%] sm:w-[85%] md:w-[70%] lg:w-[55%] xl:w-[45%]
        flex flex-col items-center justify-start
        transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/25">

                {/* Animated background elements */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-40 animate-bounce"></div>
                <div className="absolute top-1/3 left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-50"></div>

                {/* Profile Photo with creative border */}
                <div className="relative z-10 mb-6">
                    <div className="relative">
                        <img
                            src={profilePhoto}
                            alt="Profile"
                            className="rounded-2xl w-24 h-24 sm:w-28 sm:h-28 object-cover shadow-2xl
                            border-4 border-gradient-to-br from-pink-400 to-purple-600"
                            loading="lazy"
                        />
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 rounded-2xl blur opacity-30 animate-pulse"></div>
                    </div>
                </div>

                {/* Profile Info with creative typography */}
                <div className="relative z-10 text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-pink-200 to-cyan-200
                    bg-clip-text text-transparent mb-3 drop-shadow-lg tracking-wide">
                        {name}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-200 px-4 leading-relaxed font-light max-w-sm mx-auto">
                        {bio}
                    </p>
                    {username && (
                        <p className="text-xs sm:text-sm text-pink-300 mt-2 font-mono opacity-80">@{username}</p>
                    )}
                </div>

                {/* Creative Links with staggered animation */}
                <div className="relative z-10 w-full flex flex-col space-y-4 items-stretch max-w-sm">
                    {links?.slice(0, 5).map((link, index) => (
                        <a
                            key={index}
                            href={link.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block bg-white/10 backdrop-blur-md rounded-2xl text-center
                px-6 py-4 text-sm sm:text-base font-medium
                shadow-lg hover:shadow-2xl hover:bg-white/20
                transition-all duration-500 transform hover:scale-110 hover:-translate-y-2
                border border-white/30 hover:border-white/50
                overflow-hidden"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            {/* Animated background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <span className="relative text-white group-hover:text-white font-semibold tracking-wide">
                                {link.label || `Link ${index + 1}`}
                            </span>

                            {/* Hover effect sparkles */}
                            <div className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full opacity-0
                            group-hover:opacity-100 group-hover:animate-ping transition-all duration-300"></div>
                        </a>
                    ))}
                </div>

                {/* Bottom decorative element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-b-3xl"></div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default LayoutMain2;