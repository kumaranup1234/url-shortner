import React from "react";

const Layout1 = ({
                     username = "username",
                     name = "Your Name",
                     bio = "Your bio here",
                     profilePhoto = "https://clipartcraft.com/images/assassins-creed-logo-gold.png",
                     links = [],
                     isClicked = false
                 }) => {

    const getBioSpacing = (bioText) => {
        if (!bioText || bioText.length < 50) return "mb-6";
        if (bioText.length < 100) return "mb-4";
        return "mb-3";
    };

    return (
        <div className={`border relative bg-gradient-to-br from-green-300 to-yellow-100 p-4 rounded-lg shadow-lg w-[310px] min-h-[390px] mx-auto flex flex-col
        ${isClicked ? "border-blue-500 border-2" : "border-transparent"}`}>

            {/* Profile Photo */}
            <div className="flex justify-center mb-3">
                <img
                    src={profilePhoto || "https://clipartcraft.com/images/assassins-creed-logo-gold.png"}
                    alt="Profile Picture"
                    className="rounded-full w-16 h-16 object-cover"
                    loading="lazy"
                />
            </div>

            {/* Profile Info */}
            <div className={`text-center ${getBioSpacing(bio)}`}>
                <h1 className="text-md font-bold font-serif mb-1">{name}</h1>
                <p className="text-xs text-gray-600 leading-relaxed px-1">{bio}</p>
                {username && <p className="text-xs text-gray-500 mt-1">@{username}</p>}
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-2">
                {links && links.length > 0 ? (
                    links.slice(0, 5).map((link, index) => (
                        <a
                            key={index}
                            href={link.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white rounded-full text-center p-2 shadow-md hover:bg-gray-100 text-sm transition-colors duration-200"
                        >
                            <span className="font-semibold">{link.label || `Link ${index + 1}`}</span>
                        </a>
                    ))
                ) : (
                    //default links if none provided
                    <>
                        <a href="#" className="block bg-white rounded-full text-center p-2 shadow-md hover:bg-gray-100 text-sm transition-colors duration-200">
                            <span className="font-semibold">Website</span>
                        </a>
                        <a href="#" className="block bg-white rounded-full text-center p-2 shadow-md hover:bg-gray-100 text-sm transition-colors duration-200">
                            <span className="font-semibold">Twitter</span>
                        </a>
                        <a href="#" className="block bg-white rounded-full text-center p-2 shadow-md hover:bg-gray-100 text-sm transition-colors duration-200">
                            <span className="font-semibold">Portfolio</span>
                        </a>
                        <a href="#" className="block bg-white rounded-full text-center p-2 shadow-md hover:bg-gray-100 text-sm transition-colors duration-200">
                            <span className="font-semibold">Pinterest</span>
                        </a>
                        <a href="#" className="block bg-white rounded-full text-center p-2 shadow-md hover:bg-gray-100 text-sm transition-colors duration-200">
                            <span className="font-semibold">Instagram</span>
                        </a>
                    </>
                )}
            </div>
        </div>
    );
};

export default Layout1;