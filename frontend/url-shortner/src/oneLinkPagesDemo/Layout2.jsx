import React from "react";
import {FaInstagram, FaYoutube} from "react-icons/fa";

const Layout2 = ({ username = "username", name = "Oasis Wellness", bio = "Relax, refresh, restore", profilePhoto, links = [], isClicked = false }) => {
    return (
        <div className={`border p-4 rounded-2xl shadow-md bg-gradient-to-b from-orange-50 to-white w-[310px] min-h-[390px] mx-auto flex flex-col ${isClicked ? "border-blue-500 border-2" : "border-transparent"}`}>
            <div className="flex justify-center mb-3">
                <img src={profilePhoto || "https://i.imgur.com/vE5Xq7R.png"} alt="Profile" className="w-16 h-16 rounded-full border-4 border-white shadow" />
            </div>
            <div className="text-center mb-4">
                <h1 className="font-bold text-md font-serif">{name}</h1>
                <p className="text-sm text-gray-600">{bio}</p>
                {username && <p className="text-xs text-gray-400 mt-1">@{username}</p>}
            </div>
            {/* Social Icons */}
            <div className="flex justify-center gap-4 mb-4">
                <a href="#" className="text-xl text-gray-700 hover:text-pink-500"><FaInstagram /></a>
                <a href="#" className="text-xl text-gray-700 hover:text-red-500"><FaYoutube /></a>
            </div>
            <div className="flex flex-col gap-3">
                {(links.length ? links.slice(0, 2) : [{ label: "Our new services" }, { label: "Book now" }]).map((link, i) => (
                    <a key={i} href={link.url || "#"} className="flex items-center justify-center rounded-full border border-black px-3 py-2 text-sm font-medium hover:bg-gray-100">
                        {link.label}
                    </a>
                ))}
                <img src="https://i.imgur.com/KC5Zx8f.jpg" alt="Preview" className="mt-2 rounded-lg object-cover h-32" />
            </div>
        </div>
    );
};

export default Layout2;