import React from "react";

const LayoutMain5 = ({
    username,
    name,
    bio,
    profilePhoto,
    links = [],
}) => {
    return (
        <div className="min-h-screen bg-[#FFDE59] text-black font-sans flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')]"></div>

            <div className="relative z-10 w-full max-w-lg">

                {/* Main Container */}
                <div className="bg-white border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 relative">

                    {/* Floating Badge */}
                    <div className="absolute -top-6 -right-6 bg-[#FF5757] text-white border-4 border-black p-4 rotate-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-xl animate-bounce">
                        New!
                    </div>

                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                        <img
                            src={profilePhoto}
                            alt="Profile"
                            className="w-32 h-32 object-cover border-[5px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex-shrink-0"
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl sm:text-5xl font-black uppercase leading-none mb-2 tracking-tighter">
                                {name}
                            </h1>
                            <div className="inline-block bg-black text-white text-sm font-bold px-3 py-1 uppercase transform -rotate-2">
                                @{username}
                            </div>
                        </div>
                    </div>

                    {/* Bio Box */}
                    <div className="bg-[#7ED957] border-4 border-black p-6 mb-10 font-bold text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        "{bio}"
                    </div>

                    {/* Links Column */}
                    <div className="space-y-5">
                        {links?.slice(0, 5).map((link, i) => (
                            <a
                                key={i}
                                href={link.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block w-full border-[4px] border-black p-5 font-black uppercase text-xl text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[6px] active:translate-y-[6px] active:shadow-none
                                ${i % 3 === 0 ? 'bg-[#FF914D] hover:bg-[#FFB280]' :
                                        i % 3 === 1 ? 'bg-[#5CE1E6] hover:bg-[#85Ebf0]' :
                                            'bg-[#CB6CE6] hover:bg-[#DB92F0]'}`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {link.label || `LINK ${i + 1}`}
                                    <span className="text-2xl">⚡</span>
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-12 text-center font-black uppercase text-xs tracking-[0.2em] opacity-50">
                        OneLink × Neo-Brutalism
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutMain5;
