import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Layout5 = ({
    username = "username",
    name = "Bold Brand",
    bio = "Unapologetically bold.",
    profilePhoto,
    links = [],
    isClicked = false
}) => {
    return (
        <div className={`bg-[#FFDE59] text-black w-[375px] min-h-[600px] mx-auto flex flex-col font-sans ${isClicked ? "border-blue-500 border-4" : "border-black border-r-4 border-b-4 border-2"}`}>
            <div className="p-6 flex flex-col h-full">

                {/* Header Card */}
                <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 mb-6 flex items-center gap-4">
                    <img
                        src={profilePhoto || "https://i.imgur.com/vE5Xq7R.png"}
                        alt="Profile"
                        className="w-16 h-16 object-cover border-2 border-black rounded-none"
                    />
                    <div>
                        <h1 className="text-xl font-black uppercase leading-none mb-1">
                            {name}
                        </h1>
                        <div className="bg-black text-white text-[10px] uppercase font-bold px-1 inline-block">
                            @{username}
                        </div>
                    </div>
                </div>

                <div className="bg-white border-2 border-black p-3 mb-6 font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {bio}
                </div>

                {/* Links Section */}
                <div className="space-y-4 flex-1">
                    {(links.length > 0 ? links : [
                        { label: "LOUD LINK 1", url: "#" },
                        { label: "BOLD LINK 2", url: "#" },
                        { label: "HEAVY LINK 3", url: "#" }
                    ]).slice(0, 5).map((link, i) => (
                        <a
                            key={i}
                            href={link.url || "#"}
                            className="block w-full bg-[#FF914D] border-2 border-black p-3 font-black uppercase text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xIDNoMXYxSDF6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4xIi8+PC9zdmc+')]"
                        >
                            {link.label || `LINK ${i + 1}`}
                        </a>
                    ))}
                </div>

                {/* Footer marquee */}
                <div className="mt-8 border-t-2 border-black pt-4 overflow-hidden whitespace-nowrap">
                    <div className="animate-marquee inline-block font-black text-xs">
                        STAY BOLD • NO COMPROMISE • MAXIMALIST • STAY BOLD • NO COMPROMISE • MAXIMALIST
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout5;
