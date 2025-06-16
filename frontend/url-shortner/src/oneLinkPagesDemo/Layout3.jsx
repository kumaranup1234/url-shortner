import React from "react";
import {FaGlobe, FaInstagram} from "react-icons/fa";

const Layout3 = ({ username = "username", name = "The Grand Hotel", bio = "Your new escape awaits", profilePhoto, links = [], isClicked = false }) => {
    return (
        <div className={`border p-4 rounded-2xl shadow-md bg-gray-500 text-white w-[310px] min-h-[390px] mx-auto flex flex-col ${isClicked ? "border-blue-500 border-2" : "border-transparent"}`}>
            <div className="flex justify-center mb-3">
                <img src={profilePhoto || "https://i.imgur.com/o5Gh7Ml.png"} alt="Profile" className="w-16 h-16 rounded-full border-4 border-white shadow" />
            </div>
            <div className="text-center mb-4">
                <h1 className="font-bold text-md font-serif">{name}</h1>
                <p className="text-sm text-gray-300">{bio}</p>
                {username && <p className="text-xs text-gray-400 mt-1">@{username}</p>}
            </div>
            {/* Social Icons */}
            <div className="flex justify-center gap-4 mb-4">
                <a href="#" className="text-xl text-gray-700 hover:text-pink-500"><FaInstagram /></a>
                <a href="#" className="text-xl text-white hover:text-blue-400"><FaGlobe /></a>
            </div>
            <div className="flex flex-col gap-3">
                {(links.length ? links.slice(0, 2) : [{ label: "Website" }, { label: "Book your stay" }]).map((link, i) => (
                    <a key={i} href={link.url || "#"} className="rounded-md bg-gray-100 text-black px-3 py-2 text-sm font-medium text-center hover:bg-gray-200">
                        {link.label}
                    </a>
                ))}
                <img src="https://i.imgur.com/yPzU7Nz.jpg" alt="Hotel View" className="mt-2 rounded-lg object-cover h-32" />
            </div>
        </div>
    );
};

export default Layout3;